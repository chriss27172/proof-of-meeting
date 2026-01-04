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
              🏆 Leaderboard
            </div>
          </div>
          
          {/* Leaderboard Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '60px',
            }}
          >
            {/* Top 3 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginBottom: 50 }}>
              {/* 2nd place */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#64748b' }}>2</div>
                <div style={{ width: 80, height: 80, borderRadius: '40px', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginTop: 10 }}>
                  👤
                </div>
                <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#1e293b' }}>@user2</div>
                <div style={{ fontSize: 18, color: '#3b82f6', marginTop: 5 }}>4.7 ⭐</div>
              </div>
              
              {/* 1st place */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 'bold', color: '#fbbf24' }}>👑</div>
                <div style={{ width: 100, height: 100, borderRadius: '50px', backgroundColor: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, marginTop: 10 }}>
                  👤
                </div>
                <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#1e293b' }}>@user1</div>
                <div style={{ fontSize: 20, color: '#3b82f6', marginTop: 5 }}>4.9 ⭐</div>
              </div>
              
              {/* 3rd place */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60 }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#64748b' }}>3</div>
                <div style={{ width: 80, height: 80, borderRadius: '40px', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginTop: 10 }}>
                  👤
                </div>
                <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#1e293b' }}>@user3</div>
                <div style={{ fontSize: 18, color: '#3b82f6', marginTop: 5 }}>4.5 ⭐</div>
              </div>
            </div>
            
            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, maxWidth: 800, margin: '0 auto' }}>
              {[4, 5, 6, 7, 8].map((rank) => (
                <div
                  key={rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    gap: 20,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#64748b', width: 40 }}>{rank}</div>
                  <div style={{ width: 50, height: 50, borderRadius: '25px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
                    👤
                  </div>
                  <div style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: '#1e293b' }}>@user{rank}</div>
                  <div style={{ fontSize: 18, color: '#3b82f6' }}>4.{10 - rank} ⭐</div>
                </div>
              ))}
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

