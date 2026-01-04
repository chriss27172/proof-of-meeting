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
              padding: '40px',
              backgroundColor: '#3b82f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff' }}>
              📱 Scan QR/NFC
            </div>
          </div>
          
          {/* Scanner Area */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '60px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* QR Scanner Frame */}
            <div
              style={{
                width: 400,
                height: 400,
                border: '4px solid #3b82f6',
                borderRadius: '20px',
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
                  top: 20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderTop: '6px solid #3b82f6',
                  borderLeft: '6px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderTop: '6px solid #3b82f6',
                  borderRight: '6px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderBottom: '6px solid #3b82f6',
                  borderLeft: '6px solid #3b82f6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderBottom: '6px solid #3b82f6',
                  borderRight: '6px solid #3b82f6',
                }}
              />
              
              {/* QR Code placeholder */}
              <div style={{ fontSize: 120 }}>📱</div>
            </div>
            
            <div style={{ fontSize: 24, marginTop: 40, color: '#64748b', textAlign: 'center' }}>
              Position QR code or NFC tag within frame
            </div>
            
            {/* Method selector */}
            <div style={{ display: 'flex', gap: 20, marginTop: 40 }}>
              <div style={{ padding: '15px 30px', backgroundColor: '#3b82f6', borderRadius: '8px', fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
                QR Code
              </div>
              <div style={{ padding: '15px 30px', backgroundColor: '#e2e8f0', borderRadius: '8px', fontSize: 20, fontWeight: 'bold', color: '#64748b' }}>
                NFC Tag
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

