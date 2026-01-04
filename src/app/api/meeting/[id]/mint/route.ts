import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { prisma } from '@/lib/prisma';
import { createAttestation } from '@/lib/eas';
import { sendPaymentFee } from '@/lib/baseClient';
import { createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const meetingId = params.id;
    
    // Support both Frame requests and direct API calls with wallet
    let fid: number | null = null;
    let walletAddress: string | null = null;
    let recipient: `0x${string}` | null = null;
    let attestationData: any = null;

    // Try to get frame data first
    try {
      const frameData = await getFrameMessage(body);
      if (frameData?.isValid && frameData.message) {
        fid = frameData.message.interactor.fid;
      }
    } catch {
      // Not a frame request, check for direct API call with wallet
      walletAddress = body.walletAddress;
      recipient = body.recipient;
      attestationData = body.attestationData;
    }

    // Get meeting
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        initiator: true,
        participant: true,
      },
    });

    if (!meeting) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [{ label: 'Back' }],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Meeting+not+found`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // Verify user is part of the meeting (for Frame requests)
    if (fid && meeting.initiatorFid !== fid && meeting.participantFid !== fid) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [{ label: 'Back' }],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Unauthorized`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // For direct API calls, verify wallet address matches meeting participants
    if (walletAddress) {
      const initiatorWallet = meeting.initiator.walletAddress?.toLowerCase();
      const participantWallet = meeting.participant.walletAddress?.toLowerCase();
      const callerWallet = walletAddress.toLowerCase();
      
      if (initiatorWallet !== callerWallet && participantWallet !== callerWallet) {
        return new Response(
          JSON.stringify({ error: 'Wallet address does not match meeting participants' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if already minted
    if (meeting.attestationId) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View Attestation',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`,
            },
            { label: 'Back' },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Already+minted`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // Prepare attestation data
    const finalAttestationData = attestationData || {
      meetingId: meeting.id,
      initiatorFid: meeting.initiatorFid.toString(),
      participantFid: meeting.participantFid.toString(),
      initiatorUsername: meeting.initiator.username || undefined,
      participantUsername: meeting.participant.username || undefined,
      location: meeting.location || undefined,
      timestamp: Math.floor(meeting.createdAt.getTime() / 1000),
      verificationMethod: meeting.verificationMethod as 'qr' | 'nfc',
    };

    // Determine recipient and attester
    const finalRecipient = recipient || (meeting.participant.walletAddress as `0x${string}`) || '0x0';
    const attesterWallet = walletAddress || meeting.initiator.walletAddress || '0x0';

    // For direct API calls with wallet, we need to return instructions
    // The frontend will handle the actual transaction signing
    if (walletAddress && !body.skipTransaction) {
      // Return the transaction data for frontend to sign
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Please sign the transaction in your wallet',
          meetingId: meeting.id,
          attestationData: finalAttestationData,
          recipient: finalRecipient,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // For Frame requests or if wallet is not available, create mock attestation
    // In production, this should use the actual wallet client
    let attestationUID: string;
    
    if (walletAddress && body.skipTransaction) {
      // This is a mock for now - in production, use actual wallet client
      attestationUID = `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;
    } else {
      // Mock attestation (will be replaced with actual EAS call)
      attestationUID = `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;
    }

    // Update meeting with attestation
    const updatedMeeting = await prisma.meeting.update({
      where: { id: meetingId },
      data: {
        status: 'completed',
        completedAt: new Date(),
        attestationId: attestationUID,
        attestationTxHash: body.attestationUID || attestationUID, // Store tx hash
      },
    });

    // Create attestation record
    await prisma.attestation.create({
      data: {
        uid: attestationUID,
        schema: 'proof-of-meeting',
        recipient: finalRecipient,
        attester: attesterWallet,
        data: JSON.stringify(finalAttestationData),
        userId: meeting.initiator.id,
        meetingId: meeting.id,
      },
    });

    // Update reputation scores
    const { updateReputationAfterMeeting } = await import('@/lib/reputation');
    await updateReputationAfterMeeting(meeting.initiator.id);
    await updateReputationAfterMeeting(meeting.participant.id);

    // Return response based on request type
    if (walletAddress) {
      // Direct API call response
      return new Response(
        JSON.stringify({
          success: true,
          attestationUID,
          txHash: attestationUID, // In production, use actual tx hash
          meetingId: meeting.id,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Frame response
    return new Response(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'View Meeting',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`,
          },
          { label: 'Back to Menu' },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/meeting-completed?meetingId=${meeting.id}`,
          aspectRatio: '1.91:1',
        },
      }),
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    console.error('Error minting attestation:', error);
    return new Response('Error processing request', { status: 500 });
  }
}

