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
    title: 'Proof of Meeting',
    description: 'Verify real-world meetings and build reputation using EAS on Base with NFC support',
    openGraph: {
      title: 'Proof of Meeting',
      description: 'Verify real-world meetings and build reputation',
      images: [
        {
          url: `${baseUrl}/api/og/miniapp`,
          width: 1200,
          height: 630,
          alt: 'Proof of Meeting',
        },
      ],
      type: 'website',
      url: `${baseUrl}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Proof of Meeting',
      description: 'Verify real-world meetings and build reputation',
      images: [`${baseUrl}/api/og/miniapp`],
    },
    other: {
      // Base App ownership verification metatag
      // This is rendered as: <meta name="base:app_id" content="695a94c34d3a403912ed8cf0" /> in the <head> element
      'base:app_id': '695a94c34d3a403912ed8cf0',
      ...frameMetadata,
    },
  };
}

export default function Home() {
  return <HomePageContent />;
}

