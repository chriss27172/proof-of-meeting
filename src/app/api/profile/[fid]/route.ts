import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateReputationScore } from '@/lib/reputation';

export async function GET(
  req: NextRequest,
  { params }: { params: { fid: string } }
) {
  try {
    const fid = parseInt(params.fid);
    
    if (isNaN(fid)) {
      return new Response(JSON.stringify({ error: 'Invalid FID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await prisma.user.findUnique({
      where: { fid },
      include: {
        meetingsAsInitiator: {
          where: { status: 'completed' },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { participant: true },
        },
        meetingsAsParticipant: {
          where: { status: 'completed' },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { initiator: true },
        },
        reputationsReceived: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { ratedBy: true },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const metrics = await calculateReputationScore(user.id);

    // Get all users who verified meetings with this user
    const verifiedBy = await prisma.meeting.findMany({
      where: {
        OR: [
          { initiatorFid: fid, status: 'completed' },
          { participantFid: fid, status: 'completed' },
        ],
      },
      include: {
        initiator: true,
        participant: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Create a map of users who verified this user
    const verifiedByMap = new Map<string, {
      user: any;
      meetings: number;
      lastMeeting: Date;
    }>();

    verifiedBy.forEach((meeting) => {
      const otherUser = meeting.initiatorFid === fid 
        ? meeting.participant 
        : meeting.initiator;
      
      const otherUserId = otherUser.id;
      
      if (!verifiedByMap.has(otherUserId)) {
        verifiedByMap.set(otherUserId, {
          user: otherUser,
          meetings: 0,
          lastMeeting: meeting.createdAt,
        });
      }
      
      const entry = verifiedByMap.get(otherUserId)!;
      entry.meetings++;
      if (meeting.createdAt > entry.lastMeeting) {
        entry.lastMeeting = meeting.createdAt;
      }
    });

    const verifiedByList = Array.from(verifiedByMap.values())
      .sort((a, b) => b.meetings - a.meetings || b.lastMeeting.getTime() - a.lastMeeting.getTime())
      .map(entry => ({
        user: {
          fid: entry.user.fid,
          username: entry.user.username,
          displayName: entry.user.displayName,
          avatarUrl: entry.user.avatarUrl,
        },
        meetings: entry.meetings,
        lastMeeting: entry.lastMeeting,
      }));

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          fid: user.fid,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          bio: user.bio,
          location: user.location,
          createdAt: user.createdAt,
        },
        metrics,
        verifiedBy: verifiedByList,
        recentMeetings: [
          ...user.meetingsAsInitiator.map(m => ({
            id: m.id,
            otherUser: {
              fid: m.participant.fid,
              username: m.participant.username,
              displayName: m.participant.displayName,
            },
            location: m.location,
            createdAt: m.createdAt,
          })),
          ...user.meetingsAsParticipant.map(m => ({
            id: m.id,
            otherUser: {
              fid: m.initiator.fid,
              username: m.initiator.username,
              displayName: m.initiator.displayName,
            },
            location: m.location,
            createdAt: m.createdAt,
          })),
        ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10),
        recentRatings: user.reputationsReceived.map(r => ({
          score: r.score,
          notes: r.notes,
          ratedBy: {
            fid: r.ratedBy.fid,
            username: r.ratedBy.username,
          },
          createdAt: r.createdAt,
        })),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

