import { prisma } from './prisma';
import { ReputationMetrics } from './reputation';
import { calculateReputationScore } from './reputation';

export interface LeaderboardEntry {
  user: {
    id: string;
    fid: number;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  };
  metrics: ReputationMetrics;
}

export async function getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
  // Get top users by reputation score
  const users = await prisma.user.findMany({
    take: limit,
    orderBy: { reputationScore: 'desc' },
    select: {
      id: true,
      fid: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      reputationScore: true,
      totalMeetings: true,
      totalAttestations: true,
    },
  });

  // Calculate full metrics for each user
  const leaderboard: LeaderboardEntry[] = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const metrics = await calculateReputationScore(user.id);
    
    leaderboard.push({
      user: {
        id: user.id,
        fid: user.fid,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      metrics: {
        ...metrics,
        rank: i + 1,
      },
    });
  }

  return leaderboard;
}

export async function getUserRank(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { reputationScore: true },
  });

  if (!user) {
    return 0;
  }

  const usersAbove = await prisma.user.count({
    where: {
      reputationScore: {
        gt: user.reputationScore,
      },
    },
  });

  return usersAbove + 1;
}

