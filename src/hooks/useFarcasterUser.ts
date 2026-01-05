'use client';

import { useEffect, useState } from 'react';

// Dynamic import dla AuthKit (opcjonalny - tylko jeśli użytkownik nie jest w Mini App)
let useProfile: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const authKit = require('@farcaster/auth-kit');
  useProfile = authKit.useProfile;
} catch {
  // AuthKit nie jest zainstalowany - to jest OK, używamy tylko Mini App SDK
  console.log('⚠️ @farcaster/auth-kit not installed - AuthKit features will be disabled');
}

export interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
}

/**
 * Hook do pobierania danych użytkownika z Farcaster MiniApp SDK
 * W miniapp kontekście użytkownik już jest zalogowany, więc nie potrzebujemy signIn
 */
export function useFarcasterUser() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Wait for SDK to be ready
      if (typeof window !== 'undefined') {
        await new Promise(resolve => {
          const checkReady = () => {
            if (document.readyState === 'complete') {
              resolve(void 0);
            } else {
              document.addEventListener('DOMContentLoaded', () => resolve(void 0));
            }
          };

          // Listen for SDK ready event
          window.addEventListener('farcaster-sdk-ready', () => resolve(void 0), { once: true });
          
          // Listen for user available event (from FarcasterSDK)
          window.addEventListener('farcaster-user-available', () => resolve(void 0), { once: true });

          // Fallback timeout - miniapp context może być dostępny od razu
          setTimeout(() => resolve(void 0), 3000);

          checkReady();
        });
      }

      try {
        // Dynamically import SDK to avoid SSR issues
        const { sdk } = await import('@farcaster/miniapp-sdk');

        console.log('🔍 Farcaster SDK loaded, initializing...');
        console.log('SDK object:', sdk);
        console.log('SDK actions:', sdk.actions);
        
        // NOTE: sdk.actions.ready() jest już wywoływane w FarcasterSDK.tsx
        // Nie wywołujemy go tutaj, aby uniknąć duplikacji
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/getting-started

        // WAŻNE: Sprawdź czy jesteśmy w Mini App przed dostępem do context
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/is-in-mini-app
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('🔍 Is in Mini App:', isInMiniApp);

        if (isInMiniApp) {
          // W Mini App - użyj sdk.context.user
          console.log('🔍 Checking user context from Mini App SDK...');
          
          let attempts = 0;
          const maxAttempts = 100;

          const checkContext = async () => {
            attempts++;
            try {
              // sdk.context jest Promise, więc musimy go awaitować
              // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/context
              // Context zawiera: user, location, client, features
              const context = await sdk.context;
              console.log(`🔍 Context check ${attempts}/${maxAttempts}:`, context);
              
              if (context) {
                console.log('📋 Context keys:', Object.keys(context));
              }

              // Zgodnie z dokumentacją Farcaster Mini Apps SDK:
              // https://miniapps.farcaster.xyz/docs/sdk/context
              // Użytkownik jest dostępny przez context.user
              const userData = context?.user;

              console.log('👤 User data from context.user:', userData);
              
              if (userData && userData.fid) {
                const fid = userData.fid;
                console.log('✅ User found in Farcaster Mini App context:', { 
                  fid, 
                  username: userData.username,
                  displayName: userData.displayName 
                });
                
                setUser({
                  fid: typeof fid === 'number' ? fid : parseInt(String(fid)),
                  // Username w kontekście jest bez @ zgodnie z dokumentacją
                  username: userData.username || undefined,
                  displayName: userData.displayName || undefined,
                });
                setLoading(false);
                return;
              }

              // Jeśli kontekst istnieje ale nie ma użytkownika, poczekaj chwilę
              // Kontekst może być jeszcze nie w pełni załadowany
              if (context && attempts < maxAttempts) {
                // Kontynuuj sprawdzanie kontekstu
                setTimeout(() => checkContext(), 100);
              } else if (attempts >= maxAttempts) {
                console.log('❌ No user found in Farcaster context after all attempts');
                console.log('Final context:', context);
                console.log('Context.user:', context?.user);
                // W miniapp kontekście powinniśmy mieć dostęp do użytkownika przez context.user
                // Jeśli nie mamy, to znaczy że nie jesteśmy w kontekście miniapp
                // Ale nie ustawiamy błędu - pozwalamy aplikacji działać bez użytkownika
                setUser(null);
                setLoading(false);
              }
            } catch (contextError) {
              console.error('❌ Error checking context:', contextError);
              if (attempts < maxAttempts) {
                setTimeout(() => checkContext(), 50);
              } else {
                setUser(null);
                setLoading(false);
              }
            }
          };

          // Rozpocznij sprawdzanie kontekstu od razu
          checkContext();
        } else {
          // Nie jesteśmy w Mini App - AuthKit będzie użyty jako fallback przez useProfile hook
          console.log('⚠️ Not in Mini App - AuthKit will be used as fallback');
          setLoading(false);
        }

      } catch (err) {
        console.error('Farcaster SDK initialization error:', err);
        // Jeśli SDK nie jest dostępne, spróbuj AuthKit jako fallback
        // Kontynuujemy poniżej
      }
    };

    fetchUser();
  }, []);

  // Użyj AuthKit jako fallback jeśli nie jesteśmy w Mini App
  // Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/use-profile
  const authKitProfile = useProfile ? useProfile() : { isAuthenticated: false, profile: null };
  
  useEffect(() => {
    // Jeśli nie mamy użytkownika z Mini App SDK, sprawdź AuthKit
    // AuthKit działa tylko poza Mini App (w zwykłej przeglądarce)
    if (!user && useProfile && authKitProfile.isAuthenticated && authKitProfile.profile) {
      console.log('✅ User found via AuthKit (Sign In with Farcaster):', authKitProfile.profile);
      setUser({
        fid: authKitProfile.profile.fid,
        username: authKitProfile.profile.username || undefined,
        displayName: authKitProfile.profile.displayName || undefined,
      });
      setLoading(false);
    } else if (!user && !loading && (!useProfile || !authKitProfile.isAuthenticated)) {
      // Jeśli nie mamy użytkownika ani z Mini App ani z AuthKit
      // To jest OK - użytkownik może zalogować się przez SignInButton
      setLoading(false);
    }
  }, [user, useProfile, authKitProfile.isAuthenticated, authKitProfile.profile]);

  return { user, loading, error };
}

