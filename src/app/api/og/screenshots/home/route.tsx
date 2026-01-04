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
              padding: '40px',
              backgroundColor: '#3b82f6',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 80, marginRight: 20 }}>🤝</div>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff' }}>
              Proof of Meeting
            </div>
          </div>
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '60px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#1e40af' }}>
              Verify Real-world Meetings
            </div>
            <div style={{ fontSize: 24, color: '#64748b', marginBottom: 40, textAlign: 'center' }}>
              Build reputation using EAS on Base
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 400 }}>
              <div style={{ padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', fontSize: 20, fontWeight: 'bold', color: '#1e40af' }}>
                👤 My Profile
              </div>
              <div style={{ padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', fontSize: 20, fontWeight: 'bold', color: '#1e40af' }}>
                📱 Scan QR/NFC
              </div>
              <div style={{ padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', fontSize: 20, fontWeight: 'bold', color: '#1e40af' }}>
                🏆 Leaderboard
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate screenshot`, {
      status: 500,
    });
  }
}

