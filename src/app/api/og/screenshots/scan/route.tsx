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
              padding: '60px 40px',
              backgroundColor: '#3b82f6',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 'bold', color: '#ffffff' }}>
              Scan QR/NFC
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
              justifyContent: 'center',
            }}
          >
            {/* Scanner Frame */}
            <div
              style={{
                width: 800,
                height: 800,
                border: '10px solid #3b82f6',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 60,
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 120 }}>📷</div>
              {/* Corner markers */}
              <div style={{ position: 'absolute', top: -10, left: -10, width: 80, height: 80, borderTop: '10px solid #1e40af', borderLeft: '10px solid #1e40af', borderRadius: '10px 0 0 0' }} />
              <div style={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderTop: '10px solid #1e40af', borderRight: '10px solid #1e40af', borderRadius: '0 10px 0 0' }} />
              <div style={{ position: 'absolute', bottom: -10, left: -10, width: 80, height: 80, borderBottom: '10px solid #1e40af', borderLeft: '10px solid #1e40af', borderRadius: '0 0 0 10px' }} />
              <div style={{ position: 'absolute', bottom: -10, right: -10, width: 80, height: 80, borderBottom: '10px solid #1e40af', borderRight: '10px solid #1e40af', borderRadius: '0 0 10px 0' }} />
            </div>

            {/* Method Selection */}
            <div style={{ display: 'flex', gap: 30 }}>
              <div style={{ padding: '25px 40px', backgroundColor: '#3b82f6', borderRadius: '12px', fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>
                QR Code
              </div>
              <div style={{ padding: '25px 40px', backgroundColor: '#e0e7ff', borderRadius: '12px', fontSize: 28, fontWeight: 'bold', color: '#1e40af' }}>
                NFC Tag
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

