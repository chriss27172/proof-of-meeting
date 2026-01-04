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
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 24,
            }}
          >
            🤝
          </div>
        </div>
      ),
      {
        width: 32,
        height: 32,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate favicon`, {
      status: 500,
    });
  }
}

