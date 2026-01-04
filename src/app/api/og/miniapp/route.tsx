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
            backgroundColor: '#3b82f6',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 120,
              marginBottom: 40,
            }}
          >
            🤝
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Proof of Meeting
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#e0e7ff',
              textAlign: 'center',
              padding: '0 60px',
            }}
          >
            Verify meetings & build reputation
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
