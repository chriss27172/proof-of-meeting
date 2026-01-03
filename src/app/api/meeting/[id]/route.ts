import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id: params.id },
      include: {
        initiator: {
          select: {
            fid: true,
            username: true,
            walletAddress: true,
          },
        },
        participant: {
          select: {
            fid: true,
            username: true,
            walletAddress: true,
          },
        },
      },
    });

    if (!meeting) {
      return new Response(JSON.stringify({ error: 'Meeting not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        id: meeting.id,
        initiatorFid: meeting.initiatorFid,
        participantFid: meeting.participantFid,
        initiator: {
          username: meeting.initiator.username,
          walletAddress: meeting.initiator.walletAddress,
        },
        participant: {
          username: meeting.participant.username,
          walletAddress: meeting.participant.walletAddress,
        },
        location: meeting.location,
        createdAt: meeting.createdAt.toISOString(),
        verificationMethod: meeting.verificationMethod,
        attestationId: meeting.attestationId,
        status: meeting.status,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching meeting:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

