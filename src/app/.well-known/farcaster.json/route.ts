import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proof-of-meeting.vercel.app';

  // Farcaster/BaseApp miniapp manifest - zgodny z wymaganiami Farcaster i BaseApp
  const farcasterManifest: any = {
    // Account Association - wymagane do weryfikacji własności domeny
    // Pozwala Farcaster rozpoznać aplikację jako należącą do użytkownika
    accountAssociation: {
      header: process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER || 'eyJmaWQiOjE5MjQ5MCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGE2OTQ3MGE5YjY1NTcyOTREY2U0ODU3OTZCODBhNzJkNTI2ZGRjOEQifQ',
      payload: process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD || 'eyJkb21haW4iOiJwcm9vZi1vZi1tZWV0aW5nLnZlcmNlbC5hcHAifQ',
      signature: process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE || 'YrUzpVmsR9NkZl2toXSsj/ZncfhBEWu4rNau9dQB8St8HYyGfu/j7B2di/0oxXYGms1rR+Sg6+cJVVf6gmMgWxs=',
    },

    // Miniapp configuration - zgodne z wymaganiami Farcaster/BaseApp
    miniapp: {
      version: '1',
      name: 'Proof of Meeting',
      description: 'Verify real-world meetings and build reputation using EAS on Base with NFC support. Connect with others from Farcaster and BaseApp.',
      iconUrl: `${baseUrl}/icon.png`,
      homeUrl: `${baseUrl}/`,
      imageUrl: `${baseUrl}/api/og/miniapp`,
      buttonTitle: 'Open App',
      splashImageUrl: `${baseUrl}/api/og`,
      splashBackgroundColor: '#ffffff',
      webhookUrl: `${baseUrl}/api/webhook`,
      subtitle: 'Verify meetings and build rep',
      primaryCategory: 'social',
      tags: ['social', 'meetings', 'reputation', 'verification', 'nfc'],
      heroImageUrl: `${baseUrl}/api/og/miniapp`,
      tagline: 'Verify meetings and build rep',
      ogTitle: 'Proof of Meeting',
      ogDescription: 'Verify real-world meetings and build reputation using EAS on Base with NFC support',
      ogImageUrl: `${baseUrl}/api/og/miniapp`,
      requiredChains: ['eip155:8453'], // Base Mainnet
      requiredCapabilities: ['actions.ready'],
      screenshotUrls: [
        `${baseUrl}/api/og/screenshots/home`,
        `${baseUrl}/api/og/screenshots/profile`,
        `${baseUrl}/api/og/screenshots/scan`,
      ],
    },
  };

  return NextResponse.json(farcasterManifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

