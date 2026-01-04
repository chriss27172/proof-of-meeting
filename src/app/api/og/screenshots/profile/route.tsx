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
            backgroundColor: '#f8fafc',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: '40px',
              backgroundColor: '#3b82f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff' }}>
              User Profile
            </div>
          </div>
          
          {/* Profile Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '60px',
              alignItems: 'center',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '60px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
                marginBottom: 30,
              }}
            >
              👤
            </div>
            
            {/* Username */}
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 10, color: '#1e293b' }}>
              @username
            </div>
            
            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#3b82f6' }}>12</div>
                <div style={{ fontSize: 18, color: '#64748b' }}>Meetings</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#3b82f6' }}>4.8</div>
                <div style={{ fontSize: 18, color: '#64748b' }}>Reputation</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#3b82f6' }}>25</div>
                <div style={{ fontSize: 18, color: '#64748b' }}>Verified By</div>
              </div>
            </div>
            
            {/* Recent Meetings */}
            <div style={{ marginTop: 50, width: '100%', maxWidth: 600 }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1e293b' }}>
                Recent Meetings
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', fontSize: 18 }}>
                  🤝 Meeting with @user2 - Verified
                </div>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', fontSize: 18 }}>
                  🤝 Meeting with @user3 - Verified
                </div>
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

