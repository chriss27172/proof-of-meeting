import { prisma } from './prisma';

export interface ReputationMetrics {
  reputationScore: number;
  totalMeetings: number;
  totalAttestations: number;
  totalRatings: number;
  averageRating: number;
  trustLevel: 'high' | 'medium' | 'low';
  rank?: number; // Leaderboard rank
}

export async function calculateReputationScore(userId: string): Promise<ReputationMetrics> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      meetingsAsInitiator: {
        where: { status: 'completed' },
      },
      meetingsAsParticipant: {
        where: { status: 'completed' },
      },
      attestations: true,
      reputationsReceived: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const totalMeetings = user.meetingsAsInitiator.length + user.meetingsAsParticipant.length;
  const totalAttestations = user.attestations.length;
  const totalRatings = user.reputationsReceived.length;

  const averageRating = totalRatings > 0
    ? user.reputationsReceived.reduce((sum, r) => sum + r.score, 0) / totalRatings
    : 0;

  // Calculate reputation score (weighted formula)
  // Base score from meetings (40%), attestations (30%), ratings (30%)
  const meetingScore = Math.min(totalMeetings * 2, 100); // Max 50 meetings = 100 points
  const attestationScore = Math.min(totalAttestations * 5, 100); // Max 20 attestations = 100 points
  const ratingScore = averageRating * 20; // Max 5.0 rating = 100 points

  const reputationScore = (meetingScore * 0.4) + (attestationScore * 0.3) + (ratingScore * 0.3);

  let trustLevel: 'high' | 'medium' | 'low' = 'low';
  if (reputationScore >= 70 && totalMeetings >= 5 && averageRating >= 4.0) {
    trustLevel = 'high';
  } else if (reputationScore >= 40 && totalMeetings >= 2 && averageRating >= 3.0) {
    trustLevel = 'medium';
  }

  // Update cached values in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      reputationScore,
      totalMeetings,
      totalAttestations,
    },
  });

  return {
    reputationScore: Math.round(reputationScore * 100) / 100,
    totalMeetings,
    totalAttestations,
    totalRatings,
    averageRating: Math.round(averageRating * 100) / 100,
    trustLevel,
  };
}

export async function updateReputationAfterMeeting(userId: string): Promise<void> {
  await calculateReputationScore(userId);
}

export async function getReputationNetwork(userId: string): Promise<any[]> {
  const meetups = await prisma.meeting.findMany({
    where: {
      OR: [
        { initiator: { id: userId } },
        { participant: { id: userId } },
      ],
      status: 'completed',
    },
    include: {
      initiator: true,
      participant: true,
    },
  });

  // Build network map
  const network = new Map<string, { user: any; meetings: number; lastMeeting: Date }>();

  meetups.forEach((meeting) => {
    const otherUserId = meeting.initiator.id === userId
      ? meeting.participant.id
      : meeting.initiator.id;
    
    const otherUser = meeting.initiator.id === userId
      ? meeting.participant
      : meeting.initiator;

    if (!network.has(otherUserId)) {
      network.set(otherUserId, { user: otherUser, meetings: 0, lastMeeting: meeting.createdAt });
    }
    const entry = network.get(otherUserId)!;
    entry.meetings++;
    if (meeting.createdAt > entry.lastMeeting) {
      entry.lastMeeting = meeting.createdAt;
    }
  });

  return Array.from(network.values())
    .sort((a, b) => b.meetings - a.meetings || b.lastMeeting.getTime() - a.lastMeeting.getTime());
}

