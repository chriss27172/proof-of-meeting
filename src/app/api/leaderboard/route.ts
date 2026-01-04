import { type NextRequest } from 'next/server';
import { getLeaderboard } from '@/lib/leaderboard';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100');

    const leaderboard = await getLeaderboard(limit);

    return new Response(
      JSON.stringify({
        leaderboard,
        total: leaderboard.length,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

