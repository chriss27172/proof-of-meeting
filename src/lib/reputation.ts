import { prisma } from './prisma';
import { fetchNeynarScore } from './neynar';

export interface ReputationMetrics {
  reputationScore: number;
  totalMeetings: number;
  totalAttestations: number;
  totalRatings: number;
  averageRating: number;
  trustLevel: 'high' | 'medium' | 'low';
  rank?: number; // Leaderboard rank
  neynarScore?: number | null; // Neynar user quality score (0-1)
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

  // Fetch or use cached Neynar Score
  let neynarScore: number | null = user.neynarScore ?? null;
  
  // If not cached or older than 24 hours, fetch fresh score
  // For now, we'll fetch if not cached (can add timestamp check later)
  if (neynarScore === null) {
    neynarScore = await fetchNeynarScore(user.fid);
    // Cache the score in database
    if (neynarScore !== null) {
      await prisma.user.update({
        where: { id: userId },
        data: { neynarScore },
      });
    }
  }

  // Calculate reputation score (weighted formula)
  // Base score from meetings (35%), attestations (25%), ratings (25%), Neynar Score (15%)
  const meetingScore = Math.min(totalMeetings * 2, 100); // Max 50 meetings = 100 points
  const attestationScore = Math.min(totalAttestations * 5, 100); // Max 20 attestations = 100 points
  const ratingScore = averageRating * 20; // Max 5.0 rating = 100 points
  
  // Neynar Score multiplier: convert 0-1 to 0-100, with bonus for higher scores
  // Higher Neynar Score gives more points (e.g., 0.9 Neynar Score = 90 base points, but with 1.2x multiplier = 108 points)
  const neynarScorePoints = neynarScore !== null 
    ? neynarScore * 100 * (1 + neynarScore * 0.2) // Bonus multiplier: 1.0-1.2x based on score
    : 50; // Default to 50 if no Neynar Score available (neutral)

  const reputationScore = (meetingScore * 0.35) + (attestationScore * 0.25) + (ratingScore * 0.25) + (neynarScorePoints * 0.15);

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
      neynarScore: neynarScore ?? undefined,
    },
  });

  return {
    reputationScore: Math.round(reputationScore * 100) / 100,
    totalMeetings,
    totalAttestations,
    totalRatings,
    averageRating: Math.round(averageRating * 100) / 100,
    trustLevel,
    neynarScore,
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

