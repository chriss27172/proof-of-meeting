import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
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
            fontSize: 200,
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

