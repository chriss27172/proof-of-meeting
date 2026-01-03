import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const meetingId = searchParams.get('meetingId') || '';
    const mutual = searchParams.get('mutual') === 'true';

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
            {mutual ? '🤝✨' : '🤝'}
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
            {mutual ? 'Mutual Verification!' : 'Meeting Confirmed'}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#1e3a8a',
              marginBottom: mutual ? 10 : 0,
            }}
          >
            {mutual ? 'Both parties verified each other!' : (meetingId ? `Meeting ID: ${meetingId}` : 'Ready to mint attestation')}
          </div>
          {mutual && (
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: '#059669',
                fontWeight: 'bold',
              }}
            >
              ✓ You verified them • ✓ They verified you
            </div>
          )}
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

