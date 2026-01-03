import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#dbeafe',
            backgroundImage: 'linear-gradient(to bottom, #dbeafe, #c7d2fe)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              marginBottom: 20,
            }}
          >
            🏆
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 50,
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: 10,
            }}
          >
            Leaderboard
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#1e3a8a',
            }}
          >
            Top users by reputation score
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

