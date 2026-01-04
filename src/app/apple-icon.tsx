import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
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
          backgroundColor: '#3b82f6',
          backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 100,
          }}
        >
          🤝
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

