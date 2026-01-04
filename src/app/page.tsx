import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import HomePageContent from '@/components/HomePageContent';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'My Profile',
      },
      {
        label: 'Browse Profiles',
      },
      {
        label: 'Show QR/NFC',
      },
      {
        label: 'Scan QR/NFC',
      },
      {
        label: 'Leaderboard',
      },
    ],
    image: {
      src: `${baseUrl}/api/og`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${baseUrl}/api/frame`,
  });

  return {
    title: 'Proof of Meeting - Verify Real-world Meetings',
    description: 'Verify real-world meetings and build reputation using EAS on Base with NFC support',
    openGraph: {
      title: 'Proof of Meeting - Verify Real-world Meetings',
      description: 'Verify real-world meetings and build reputation',
      images: [`${baseUrl}/api/og`],
    },
    other: {
      ...frameMetadata,
    },
  };
}

export default function Home() {
  return <HomePageContent />;
}

