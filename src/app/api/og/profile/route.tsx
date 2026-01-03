import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid') || '0';
    const score = searchParams.get('score') || '0';
    const meetings = searchParams.get('meetings') || '0';
    const attestations = searchParams.get('attestations') || '0';
    const rating = searchParams.get('rating') || '0';
    const level = searchParams.get('level') || 'low';

    const levelColor = level === 'high' ? '#10b981' : level === 'medium' ? '#f59e0b' : '#6b7280';

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
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: 30,
            }}
          >
            👤 My Profile
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#1e3a8a',
              marginBottom: 20,
              fontWeight: 'bold',
            }}
          >
            FID: {fid}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 30,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontSize: 24, color: '#6b7280', marginBottom: 8 }}>Reputation</div>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#1e40af' }}>{score}</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontSize: 24, color: '#6b7280', marginBottom: 8 }}>Meetings</div>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#10b981' }}>{meetings}</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontSize: 24, color: '#6b7280', marginBottom: 8 }}>Attestations</div>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#8b5cf6' }}>{attestations}</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                minWidth: '200px',
              }}
            >
              <div style={{ fontSize: 24, color: '#6b7280', marginBottom: 8 }}>Avg Rating</div>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#f59e0b' }}>{rating}</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: levelColor,
              fontWeight: 'bold',
              backgroundColor: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
            }}
          >
            Trust Level: {level.toUpperCase()}
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

