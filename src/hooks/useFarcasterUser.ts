'use client';

import { useEffect, useState } from 'react';

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

        console.log('🔍 Checking user context...');
        // sdk.context jest Promise, więc nie możemy go bezpośrednio logować
        console.log('SDK context type: Promise<MiniAppContext>');

        // W Farcaster miniapp użytkownik już jest zalogowany
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/context
        // Dane użytkownika są dostępne przez sdk.context.user
        let attempts = 0;
        const maxAttempts = 100;

        const checkContext = async () => {
          attempts++;
          try {
            // sdk.context jest Promise, więc musimy go awaitować
            // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/context
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
              console.log('✅ User found in Farcaster context:', { 
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

      } catch (err) {
        console.error('Farcaster SDK initialization error:', err);
        // Nie ustawiamy błędu - aplikacja może działać bez SDK (np. w przeglądarce)
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

