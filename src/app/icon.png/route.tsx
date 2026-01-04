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
              fontSize: 200,
              marginBottom: 20,
            }}
          >
            🤝
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              padding: '0 40px',
            }}
          >
            Proof of Meeting
          </div>
        </div>
      ),
      {
        width: 512,
        height: 512,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the icon`, {
      status: 500,
    });
  }
}


