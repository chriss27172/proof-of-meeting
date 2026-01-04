import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proof-of-meeting.vercel.app';

  // Farcaster/BaseApp miniapp manifest - zgodny z Web App Manifest i wymaganiami miniapp
  const manifest = {
    // Podstawowe informacje o aplikacji (wymagane)
    name: 'Proof of Meeting',
    short_name: 'Proof of Meeting',
    description: 'Verify real-world meetings and build reputation using EAS on Base with NFC support. Connect with others from Farcaster and BaseApp, scan QR codes or NFC tags to verify real-world meetings, and mint on-chain attestations.',

    // URL i wyświetlanie (wymagane)
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',

    // Kolory (wymagane)
    background_color: '#ffffff',
    theme_color: '#3b82f6',

    // Kategoria aplikacji (opcjonalne, ale zalecane)
    categories: ['social', 'productivity', 'utilities'],

    // Lang (wymagane dla niektórych platform)
    lang: 'en',

    // Dir (kierunek tekstu)
    dir: 'ltr',

    // Prefer related applications (opcjonalne)
    prefer_related_applications: false,

    // Ikony w różnych rozmiarach (wymagane dla PWA i miniapp)
    icons: [
      {
        src: `${baseUrl}/api/icon/16`,
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/32`,
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/48`,
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/72`,
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/96`,
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/128`,
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/144`,
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/192`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/256`,
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/384`,
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/512`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/icon/512`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${baseUrl}/api/icon/1024`,
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${baseUrl}/api/og`,
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'any',
      },
    ],

    // Screenshots (opcjonalne, ale zalecane dla miniapp)
    screenshots: [
      {
        src: `${baseUrl}/api/og`,
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Proof of Meeting - Main Screen',
      },
    ],

    // Shortcuts (szybkie akcje dla miniapp)
    shortcuts: [
      {
        name: 'My Profile',
        short_name: 'Profile',
        description: 'View your profile and reputation',
        url: '/profile',
        icons: [
          {
            src: `${baseUrl}/api/icon/96`,
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Scan QR/NFC',
        short_name: 'Scan',
        description: 'Scan QR code or NFC tag to verify meeting',
        url: '/scan',
        icons: [
          {
            src: `${baseUrl}/api/icon/96`,
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Leaderboard',
        short_name: 'Leaderboard',
        description: 'View top users by reputation',
        url: '/leaderboard',
        icons: [
          {
            src: `${baseUrl}/api/icon/96`,
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

