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
        
        // Upewnij się, że SDK jest gotowe przed sprawdzaniem kontekstu
        try {
          if (sdk.actions && sdk.actions.ready) {
            await sdk.actions.ready();
            console.log('✅ SDK ready() called successfully');
          }
        } catch (readyError) {
          console.log('⚠️ SDK ready() not available or failed (this is OK if not in miniapp):', readyError);
        }

        console.log('🔍 Checking user context...');
        console.log('SDK context:', sdk.context);
        console.log('SDK context type:', typeof sdk.context);
        console.log('SDK context keys:', sdk.context ? Object.keys(sdk.context) : 'null');

        // W Farcaster miniapp użytkownik już jest zalogowany
        // Powinniśmy móc pobrać jego dane bezpośrednio z kontekstu
        let attempts = 0;
        const maxAttempts = 150; // Zwiększamy liczbę prób

        const checkContext = async () => {
          attempts++;
          try {
            const context = sdk.context;
            console.log(`🔍 Context check ${attempts}/${maxAttempts}:`, context);
            
            if (context) {
              console.log('📋 Context keys:', Object.keys(context));
              console.log('📋 Full context:', JSON.stringify(context, null, 2));
            }

            // Sprawdź różne możliwe ścieżki do danych użytkownika
            // W Farcaster miniapp SDK, użytkownik może być w różnych miejscach
            const userData = 
              context?.user || 
              context?.interactor ||
              (context as any)?.cast?.author || 
              (context as any)?.user?.interactor ||
              (context as any)?.interactor?.user ||
              (sdk as any).user ||
              (sdk as any).context?.user ||
              (sdk as any).context?.interactor;

            console.log('👤 User data found:', userData);
            console.log('👤 User data type:', typeof userData);
            if (userData) {
              console.log('👤 User data keys:', Object.keys(userData));
            }

            if (userData && (userData.fid || userData.userFid)) {
              const fid = userData.fid || userData.userFid;
              console.log('✅ User found in Farcaster context:', { fid, userData });
              setUser({
                fid: typeof fid === 'number' ? fid : parseInt(fid),
                username: userData.username || userData.userName || undefined,
                displayName: userData.displayName || userData.display_name || undefined,
              });
              setLoading(false);
              return;
            }

            // Sprawdź czy SDK ma metodę do pobrania użytkownika
            if ((sdk as any).getUser) {
              try {
                console.log('🔍 Trying getUser() method...');
                const userFromMethod = await (sdk as any).getUser();
                console.log('👤 User from getUser method:', userFromMethod);
                if (userFromMethod && (userFromMethod.fid || userFromMethod.userFid)) {
                  const fid = userFromMethod.fid || userFromMethod.userFid;
                  setUser({
                    fid: typeof fid === 'number' ? fid : parseInt(fid),
                    username: userFromMethod.username || userFromMethod.userName,
                    displayName: userFromMethod.displayName || userFromMethod.display_name,
                  });
                  setLoading(false);
                  return;
                }
              } catch (getUserError) {
                console.log('⚠️ getUser method not available or failed:', getUserError);
              }
            }

            // Sprawdź czy SDK ma metodę actions.getUser
            if (sdk.actions && (sdk.actions as any).getUser) {
              try {
                console.log('🔍 Trying sdk.actions.getUser() method...');
                const userFromActions = await (sdk.actions as any).getUser();
                console.log('👤 User from actions.getUser method:', userFromActions);
                if (userFromActions && (userFromActions.fid || userFromActions.userFid)) {
                  const fid = userFromActions.fid || userFromActions.userFid;
                  setUser({
                    fid: typeof fid === 'number' ? fid : parseInt(fid),
                    username: userFromActions.username || userFromActions.userName,
                    displayName: userFromActions.displayName || userFromActions.display_name,
                  });
                  setLoading(false);
                  return;
                }
              } catch (getUserError) {
                console.log('⚠️ actions.getUser method not available or failed:', getUserError);
              }
            }

            // Jeśli kontekst istnieje ale nie ma użytkownika, sprawdź czy to miniapp
            if (context && attempts < maxAttempts) {
              // Kontynuuj sprawdzanie kontekstu
              setTimeout(() => checkContext(), 50); // Zmniejszamy interwał do 50ms dla szybszego wykrycia
            } else if (attempts >= maxAttempts) {
              console.log('❌ No user found in Farcaster context after all attempts');
              console.log('Final context:', context);
              console.log('SDK actions:', sdk.actions);
              console.log('SDK methods:', Object.keys(sdk));
              // W miniapp kontekście zawsze powinniśmy mieć dostęp do użytkownika
              // Jeśli nie mamy, to znaczy że coś jest nie tak z SDK lub kontekstem
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

