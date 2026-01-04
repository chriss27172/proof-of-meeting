import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Link from 'next/link';
import BuyMeCoffee from '@/components/BuyMeCoffee';

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
      ...frameMetadata,
      'base:app_id': '695a94c34d3a403912ed8cf0',
    },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">🤝 Proof of Meeting</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Verify real-world meetings and build reputation
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Meet someone from Farcaster or BaseApp? Use QR codes or NFC to verify your meeting and mint a Proof of Meeting attestation on Base using EAS.
            Build your reputation and verify connections with others.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-2xl font-bold mb-2">User Profiles</h2>
            <p className="text-gray-600 dark:text-gray-400">
              View profiles with reputation scores and meeting history
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-2xl font-bold mb-2">QR & NFC</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Generate QR codes or setup NFC tags for verification
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold mb-2">EAS Attestations</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Mint on-chain attestations via Ethereum Attestation Service on Base
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
            <p className="text-gray-600 dark:text-gray-400">
              See top users by reputation score and verified meetings
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold mb-2">Browse Profiles</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore all user profiles and check their reputation
            </p>
          </div>
        </div>

        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-gray-600 dark:text-gray-400">
                Generate your unique QR code or setup NFC tag
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <p className="text-gray-600 dark:text-gray-400">
                Meet someone and scan their QR code or tap NFC tags
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <p className="text-gray-600 dark:text-gray-400">
                Confirm meeting and mint EAS attestation on Base
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600 dark:text-gray-400">
                Build reputation and climb the leaderboard
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
          <h3 className="text-3xl font-bold mb-6">🚀 Quick Actions</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start verifying meetings and building your reputation
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/scan" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <span>📷</span>
              <span>Scan QR/NFC</span>
            </Link>
            <Link 
              href="/generate-qr" 
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <span>📱</span>
              <span>Generate QR Code</span>
            </Link>
            <Link 
              href="/leaderboard" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <span>🏆</span>
              <span>Leaderboard</span>
            </Link>
            <Link 
              href="/profiles" 
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <span>👥</span>
              <span>Browse Profiles</span>
            </Link>
            <Link 
              href="/meetings" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <span>📋</span>
              <span>My Meetings</span>
            </Link>
            <BuyMeCoffee />
          </div>
        </div>

        <div className="text-center bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-2">💡 How to Generate Your QR Code</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To generate your QR code for others to scan, use the Frame in Farcaster or BaseApp:
          </p>
          <div className="text-left max-w-2xl mx-auto space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>1. Open this app in <strong>Farcaster</strong> or <strong>BaseApp</strong></p>
            <p>2. Click <strong>"Show QR/NFC"</strong> button in the Frame</p>
            <p>3. Your QR code will be displayed - show it to others to scan</p>
            <p>4. When someone scans your QR code, both of you will be verified automatically!</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Use this app in Farcaster or BaseApp to interact with the Frame
          </p>
        </div>
      </div>
    </div>
  );
}

