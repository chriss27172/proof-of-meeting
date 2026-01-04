import { encodeAbiParameters, parseAbiParameters, type WalletClient, type PublicClient } from 'viem';
import { baseClient } from './baseClient';

// EAS Contract Addresses on Base
export const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021' as `0x${string}`; // Base mainnet
export const SCHEMA_REGISTRY_ADDRESS = '0x4200000000000000000000000000000000000020' as `0x${string}`;

// Schema for Proof of Meeting
export const PROOF_OF_MEETING_SCHEMA = 'string meetingId,string initiatorFid,string participantFid,string initiatorUsername,string participantUsername,string location,uint256 timestamp,string verificationMethod';

export interface AttestationData {
  meetingId: string;
  initiatorFid: string;
  participantFid: string;
  initiatorUsername?: string;
  participantUsername?: string;
  location?: string;
  timestamp: number;
  verificationMethod: 'qr' | 'nfc';
}

// EAS ABI (simplified - only functions we need)
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

const SCHEMA_REGISTRY_ABI = [
  {
    name: 'register',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'schema', type: 'string', internalType: 'string' },
      { name: 'resolver', type: 'address', internalType: 'address' },
      { name: 'revocable', type: 'bool', internalType: 'bool' },
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
  },
  {
    name: 'getSchema',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'uid', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: '', type: 'string', internalType: 'string' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'bool', internalType: 'bool' },
    ],
  },
] as const;

// Encode schema data
function encodeSchemaData(data: AttestationData): `0x${string}` {
  return encodeAbiParameters(
    parseAbiParameters('string,string,string,string,string,string,uint256,string'),
    [
      data.meetingId,
      data.initiatorFid,
      data.participantFid,
      data.initiatorUsername || '',
      data.participantUsername || '',
      data.location || '',
      BigInt(data.timestamp),
      data.verificationMethod,
    ]
  );
}

// Get schema UID from environment or throw error
function getSchemaUID(): `0x${string}` {
  const SCHEMA_UID = process.env.EAS_SCHEMA_UID as `0x${string}` | undefined;
  
  if (!SCHEMA_UID) {
    throw new Error(
      'EAS_SCHEMA_UID not set in .env. Please register schema at https://base.easscan.org and add the Schema UID to .env file.'
    );
  }

  // Validate format
  if (!/^0x[a-fA-F0-9]{64}$/.test(SCHEMA_UID)) {
    throw new Error('EAS_SCHEMA_UID must be a valid 32-byte hex string (0x followed by 64 hex characters)');
  }

  return SCHEMA_UID;
}

// Create EAS attestation
export async function createAttestation(
  walletClient: WalletClient,
  recipient: `0x${string}`,
  data: AttestationData,
  publicClient: typeof baseClient = baseClient
): Promise<string> {
  try {
    if (!walletClient.account) {
      throw new Error('Wallet client must have an account');
    }

    // Get schema UID from environment
    const SCHEMA_UID = getSchemaUID();

    // Encode data
    const encodedData = encodeSchemaData(data);

    // Create attestation
    const hash = await walletClient.writeContract({
      address: EAS_CONTRACT_ADDRESS,
      abi: EAS_ABI,
      functionName: 'attest',
      args: [
        SCHEMA_UID,
        {
          recipient,
          expirationTime: BigInt(0), // No expiration
          revocable: false,
          refUID: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
          data: encodedData,
          value: BigInt(0), // No payment required
        },
      ],
      account: walletClient.account,
    });

    // Wait for transaction
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    // Extract UID from logs
    // The attest function returns the UID, but we need to get it from the transaction
    // For now, we'll use the transaction hash as a reference
    // In production, parse the Attested event to get the actual UID
    
    // Return transaction hash as UID reference (in production, extract from event)
    return hash;
  } catch (error) {
    console.error('Error creating attestation:', error);
    throw error;
  }
}

// EAS ABI for reading attestations
const EAS_READ_ABI = [
  {
    name: 'getAttestation',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'uid', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: 'schema', type: 'bytes32', internalType: 'bytes32' },
      { name: 'recipient', type: 'address', internalType: 'address' },
      { name: 'attester', type: 'address', internalType: 'address' },
      { name: 'time', type: 'uint64', internalType: 'uint64' },
      { name: 'expirationTime', type: 'uint64', internalType: 'uint64' },
      { name: 'revocationTime', type: 'uint64', internalType: 'uint64' },
      { name: 'refUID', type: 'bytes32', internalType: 'bytes32' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
  },
] as const;

export async function getAttestation(uid: string): Promise<any> {
  try {
    const result = await baseClient.readContract({
      address: EAS_CONTRACT_ADDRESS,
      abi: EAS_READ_ABI,
      functionName: 'getAttestation',
      args: [uid as `0x${string}`],
    });
    
    return {
      schema: result[0],
      recipient: result[1],
      attester: result[2],
      time: result[3],
      expirationTime: result[4],
      revocationTime: result[5],
      refUID: result[6],
      data: result[7],
    };
  } catch (error) {
    console.error('Error fetching attestation:', error);
    // Return null if attestation doesn't exist
    return null;
  }
}

