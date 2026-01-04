'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseAbiParameters, encodeAbiParameters } from 'viem';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { EAS_CONTRACT_ADDRESS } from '@/lib/eas';
import { useFarcasterWallet } from '@/hooks/useFarcasterWallet';

// EAS ABI
const EAS_ABI = [
  {
    name: 'attest',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'schema', type: 'bytes32', internalType: 'bytes32' },
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct AttestationRequestData',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'expirationTime', type: 'uint64', internalType: 'uint64' },
          { name: 'revocable', type: 'bool', internalType: 'bool' },
          { name: 'refUID', type: 'bytes32', internalType: 'bytes32' },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
          { name: 'value', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
  },
] as const;

interface MeetingData {
  id: string;
  initiatorFid: number;
  participantFid: number;
  initiator: { username?: string; walletAddress?: string };
  participant: { username?: string; walletAddress?: string };
  location?: string;
  createdAt: string;
  verificationMethod: string;
  attestationId?: string;
}

export default function MintPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;
  
  const [meeting, setMeeting] = useState<MeetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Use Farcaster wallet hook
  const { address: walletAddress, walletClient, isFarcasterWallet, loading: walletLoading, connectWallet } = useFarcasterWallet();

  // Create public client for Base
  const publicClient = createPublicClient({
    chain: base,
    transport: http('https://mainnet.base.org'),
  });

  useEffect(() => {
    // Automatycznie połącz portfel jeśli jest dostępny w Farcaster miniapp
    if (isFarcasterWallet && !walletAddress && !walletLoading) {
      connectWallet();
    }
  }, [isFarcasterWallet, walletAddress, walletLoading, connectWallet]);

  useEffect(() => {
    fetchMeeting();
  }, [meetingId]);

  const fetchMeeting = async () => {
    try {
      const res = await fetch(`/api/meeting/${meetingId}`);
      if (!res.ok) throw new Error('Failed to fetch meeting');
      const data = await res.json();
      setMeeting(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load meeting');
    } finally {
      setLoading(false);
    }
  };

  // connectWallet jest teraz w hooku useFarcasterWallet
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const mintAttestation = async () => {
    if (!meeting || !walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setMinting(true);
      setError(null);

      // Get schema UID from environment (passed from API)
      const schemaUID = process.env.NEXT_PUBLIC_EAS_SCHEMA_UID as `0x${string}`;
      if (!schemaUID) {
        throw new Error('EAS_SCHEMA_UID not configured');
      }

      // Użyj wallet client z hooka
      if (!walletClient) {
        throw new Error('Wallet not connected. Please connect your wallet first.');
      }

      // Get account from wallet client
      const accounts = await walletClient.getAddresses();
      if (!accounts || accounts.length === 0) {
        throw new Error('No account found');
      }
      const account = accounts[0];

      // Prepare attestation data
      const attestationData = {
        meetingId: meeting.id,
        initiatorFid: meeting.initiatorFid.toString(),
        participantFid: meeting.participantFid.toString(),
        initiatorUsername: meeting.initiator.username || '',
        participantUsername: meeting.participant.username || '',
        location: meeting.location || '',
        timestamp: Math.floor(new Date(meeting.createdAt).getTime() / 1000),
        verificationMethod: meeting.verificationMethod,
      };

      // Encode data
      const encodedData = encodeAbiParameters(
        parseAbiParameters('string,string,string,string,string,string,uint256,string'),
        [
          attestationData.meetingId,
          attestationData.initiatorFid,
          attestationData.participantFid,
          attestationData.initiatorUsername,
          attestationData.participantUsername,
          attestationData.location,
          BigInt(attestationData.timestamp),
          attestationData.verificationMethod,
        ]
      );

      // Determine recipient (the other person in the meeting)
      const recipient = meeting.initiator.walletAddress === account.toLowerCase()
        ? (meeting.participant.walletAddress || '0x0')
        : (meeting.initiator.walletAddress || '0x0');

      // Call EAS contract directly from frontend
      const hash = await walletClient.writeContract({
        address: EAS_CONTRACT_ADDRESS,
        abi: EAS_ABI,
        functionName: 'attest',
        args: [
          schemaUID,
          {
            recipient: recipient as `0x${string}`,
            expirationTime: BigInt(0),
            revocable: false,
            refUID: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
            data: encodedData,
            value: BigInt(0),
          },
        ],
        account,
      });

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Call API to save attestation record
      const response = await fetch(`/api/meeting/${meetingId}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: account,
          recipient: recipient as `0x${string}`,
          attestationData,
          skipTransaction: true, // Transaction already done
          attestationUID: hash, // Use tx hash as UID reference
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save attestation record');
      }

      setSuccess(`Attestation minted! Transaction: ${hash}\n\nView on BaseScan: https://basescan.org/tx/${hash}`);
      
      // Redirect to meeting page after 3 seconds
      setTimeout(() => {
        router.push(`/meeting/${meetingId}`);
      }, 3000);
    } catch (err: any) {
      console.error('Mint error:', err);
      setError(err.message || 'Failed to mint attestation. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-xl">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Meeting Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (meeting.attestationId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-4">Already Minted</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This meeting already has an EAS attestation.
          </p>
          <button
            onClick={() => router.push(`/meeting/${meetingId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            View Meeting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎫</div>
            <h1 className="text-4xl font-bold mb-2">Mint EAS Attestation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create an on-chain proof of your meeting
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Meeting Details</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Initiator:</span>{' '}
                {meeting.initiator.username || `FID ${meeting.initiatorFid}`}
              </div>
              <div>
                <span className="font-semibold">Participant:</span>{' '}
                {meeting.participant.username || `FID ${meeting.participantFid}`}
              </div>
              {meeting.location && (
                <div>
                  <span className="font-semibold">Location:</span> {meeting.location}
                </div>
              )}
              <div>
                <span className="font-semibold">Method:</span>{' '}
                {meeting.verificationMethod === 'nfc' ? '📱 NFC' : '📷 QR Code'}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {!walletAddress ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect your wallet to mint the EAS attestation on Base network
              </p>
              <button
                onClick={handleConnectWallet}
                disabled={walletLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {walletLoading ? 'Connecting...' : isFarcasterWallet ? 'Use Farcaster Wallet' : 'Connect Wallet'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Connected:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  {isFarcasterWallet && <span className="ml-2 text-xs">(Farcaster)</span>}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Network: Base
                </p>
              </div>
              <button
                onClick={mintAttestation}
                disabled={minting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {minting ? 'Minting...' : 'Mint Attestation'}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                You'll be asked to confirm the transaction in your wallet
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push(`/meeting/${meetingId}`)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ← Back to Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

