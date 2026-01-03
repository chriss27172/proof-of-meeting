import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const msg = searchParams.get('msg') || 'An error occurred';

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
            backgroundColor: '#fee2e2',
            backgroundImage: 'linear-gradient(to bottom, #fee2e2, #fecaca)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              marginBottom: 20,
            }}
          >
            ⚠️
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 'bold',
              color: '#991b1b',
              marginBottom: 10,
            }}
          >
            Error
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 25,
              color: '#7f1d1d',
              maxWidth: 1000,
              textAlign: 'center',
            }}
          >
            {msg}
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

