import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proof-of-meeting.vercel.app';
  
  // Farcaster/BaseApp miniapp manifest - zgodny z wymaganiami Farcaster i BaseApp
  const farcasterManifest: any = {
    // Account Association - wymagane do weryfikacji własności domeny
    // INSTRUKCJA: Aby wygenerować te pola:
    // 1. Przejdź do https://build.base.org/preview
    // 2. Zaloguj się na swoje konto Base
    // 3. Przejdź do sekcji Preview → Account Association
    // 4. Wprowadź URL aplikacji: https://proof-of-meeting.vercel.app
    // 5. Kliknij "Submit" i podpisz manifest za pomocą portfela
    // 6. Skopiuj wygenerowane wartości header, payload, signature
    // 7. Dodaj je jako zmienne środowiskowe na Vercel:
    //    - FARCASTER_ACCOUNT_ASSOCIATION_HEADER
    //    - FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD
    //    - FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE
    accountAssociation: {
      header: process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER || '',
      payload: process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD || '',
      signature: process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE || '',
    },
    
    // Miniapp configuration - zgodne z wymaganiami Farcaster/BaseApp
    miniapp: {
      version: '1',
      name: 'Proof of Meeting',
      description: 'Verify real-world meetings and build reputation using EAS on Base with NFC support. Connect with others from Farcaster and BaseApp.',
      iconUrl: `${baseUrl}/api/icon/512`,
      homeUrl: `${baseUrl}/`,
      imageUrl: `${baseUrl}/api/og/miniapp`, // Promocyjny obrazek dla miniapp
      buttonTitle: 'Open App', // Tytuł przycisku do otwarcia miniapp
      splashImageUrl: `${baseUrl}/api/og`,
      splashBackgroundColor: '#ffffff',
      webhookUrl: `${baseUrl}/api/webhook`, // Webhook URL dla powiadomień (opcjonalne)
      subtitle: 'Verify meetings & build rep', // Krótki podtytuł
      primaryCategory: 'social',
      tags: ['social', 'meetings', 'reputation', 'verification', 'nfc'], // Max 5 tags
      heroImageUrl: `${baseUrl}/api/og`,
      tagline: 'Verify meetings & build rep', // Max 30 chars
      ogTitle: 'Proof of Meeting', // Max 30 chars
      ogDescription: 'Verify real-world meetings and build reputation using EAS on Base with NFC support',
      ogImageUrl: `${baseUrl}/api/og`,
      requiredChains: ['eip155:8453'], // Base Mainnet
      requiredCapabilities: ['actions.ready', 'actions.signIn'],
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

