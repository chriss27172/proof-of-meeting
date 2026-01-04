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
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: '80px 40px',
              backgroundColor: '#3b82f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 'bold', color: '#ffffff' }}>
              📱 Scan QR/NFC
            </div>
          </div>
          
          {/* Scanner Area */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '80px 60px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* QR Scanner Frame */}
            <div
              style={{
                width: 600,
                height: 600,
                border: '6px solid #3b82f6',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                position: 'relative',
              }}
            >
              {/* Corner markers */}
              <div
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 30,
                  width: 60,
                  height: 60,
                  borderTop: '8px solid #3b82f6',
                  borderLeft: '8px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 30,
                  width: 60,
                  height: 60,
                  borderTop: '8px solid #3b82f6',
                  borderRight: '8px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 30,
                  left: 30,
                  width: 60,
                  height: 60,
                  borderBottom: '8px solid #3b82f6',
                  borderLeft: '8px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 30,
                  width: 60,
                  height: 60,
                  borderBottom: '8px solid #3b82f6',
                  borderRight: '8px solid #3b82f6',
                }}
              />
              
              {/* QR Code placeholder */}
              <div style={{ fontSize: 180 }}>📱</div>
            </div>
            
            <div style={{ fontSize: 36, marginTop: 60, color: '#64748b', textAlign: 'center', padding: '0 40px' }}>
              Position QR code or NFC tag within frame
            </div>
            
            {/* Method selector */}
            <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
              <div style={{ padding: '25px 50px', backgroundColor: '#3b82f6', borderRadius: '16px', fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
                QR Code
              </div>
              <div style={{ padding: '25px 50px', backgroundColor: '#e2e8f0', borderRadius: '16px', fontSize: 32, fontWeight: 'bold', color: '#64748b' }}>
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

