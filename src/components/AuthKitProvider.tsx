'use client';

import { ReactNode } from 'react';

// Dynamic import dla AuthKit (opcjonalny)
let FarcasterAuthKitProvider: any = null;
let authKitStyles: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const authKit = require('@farcaster/auth-kit');
  FarcasterAuthKitProvider = authKit.AuthKitProvider;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@farcaster/auth-kit/styles.css');
} catch {
  // AuthKit nie jest zainstalowany - to jest OK, używamy tylko Mini App SDK
  console.log('⚠️ @farcaster/auth-kit not installed - AuthKit features will be disabled');
}

/**
 * AuthKit Provider dla Sign In with Farcaster
 * Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/auth-kit-provider
 * 
 * Używany jako fallback dla użytkowników, którzy nie są w Mini App
 * W Mini App używamy sdk.context.user zamiast AuthKit
 */
export default function AuthKitProvider({ children }: { children: ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'https://proof-of-meeting.vercel.app');

  const config = {
    // Domain aplikacji
    domain: typeof window !== 'undefined' 
      ? window.location.hostname 
      : new URL(baseUrl).hostname,
    
    // Login URL - endpoint do weryfikacji Sign In message
    siweUri: `${baseUrl}/api/auth/signin`,
    
    // Optimism RPC URL (AuthKit wymaga Optimism, nie Base)
    // Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/installation
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
    
    // Farcaster Auth relay server
    relay: 'https://relay.farcaster.xyz',
    
    // Wersja Farcaster Auth
    version: 'v1' as const,
  };

  // Jeśli AuthKit nie jest zainstalowany, zwróć children bez providera
  if (!FarcasterAuthKitProvider) {
    return <>{children}</>;
  }

  return (
    <FarcasterAuthKitProvider config={config}>
      {children}
    </FarcasterAuthKitProvider>
  );
}

