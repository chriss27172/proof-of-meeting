import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code') || '';

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
            🔢
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
            Verification Code
          </div>
          {code && (
            <div
              style={{
                display: 'flex',
                fontSize: 80,
                fontWeight: 'bold',
                color: '#1e3a8a',
                letterSpacing: '0.2em',
                marginTop: 20,
              }}
            >
              {code}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#1e3a8a',
              marginTop: 20,
            }}
          >
            Share this code to verify your meeting
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

