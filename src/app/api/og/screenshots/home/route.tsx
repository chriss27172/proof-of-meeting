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
            backgroundColor: '#ffffff',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: '80px 40px',
              backgroundColor: '#3b82f6',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 120, marginBottom: 30 }}>🤝</div>
            <div style={{ fontSize: 72, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>
              Proof of Meeting
            </div>
          </div>
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '80px 60px',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 'bold', marginBottom: 40, color: '#1e40af', textAlign: 'center' }}>
              Verify Real-world Meetings
            </div>
            <div style={{ fontSize: 36, color: '#64748b', marginBottom: 80, textAlign: 'center' }}>
              Build reputation using EAS on Base
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%', maxWidth: 600 }}>
              <div style={{ padding: '40px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: 32, fontWeight: 'bold', color: '#1e40af', textAlign: 'center' }}>
                👤 My Profile
              </div>
              <div style={{ padding: '40px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: 32, fontWeight: 'bold', color: '#1e40af', textAlign: 'center' }}>
                📱 Scan QR/NFC
              </div>
              <div style={{ padding: '40px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: 32, fontWeight: 'bold', color: '#1e40af', textAlign: 'center' }}>
                🏆 Leaderboard
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1284,
        height: 2778,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate screenshot`, {
      status: 500,
    });
  }
}

