import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const sizes = [16, 32, 48, 72, 96, 128, 144, 192, 256, 384, 512, 1024];

export async function GET(
  req: NextRequest,
  { params }: { params: { size: string } }
) {
  try {
    const size = parseInt(params.size);

    if (!sizes.includes(size)) {
      return new Response('Invalid size', { status: 400 });
    }

    // Calculate font size based on icon size
    const fontSize = Math.floor(size * 0.4);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: fontSize,
            }}
          >
            🤝
          </div>
        </div>
      ),
      {
        width: size,
        height: size,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate icon`, {
      status: 500,
    });
  }
}

