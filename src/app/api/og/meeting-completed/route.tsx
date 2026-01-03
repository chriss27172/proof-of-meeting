import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const meetingId = searchParams.get('meetingId') || '';

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
            backgroundColor: '#dcfce7',
            backgroundImage: 'linear-gradient(to bottom, #dcfce7, #bbf7d0)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              marginBottom: 20,
            }}
          >
            ✅
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 50,
              fontWeight: 'bold',
              color: '#166534',
              marginBottom: 10,
            }}
          >
            Meeting Completed!
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#14532d',
            }}
          >
            EAS Attestation minted on Base
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

