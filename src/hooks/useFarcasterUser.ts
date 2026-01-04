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

        console.log('Farcaster SDK loaded, checking user context...');
        console.log('SDK object:', sdk);
        console.log('SDK context:', sdk.context);

        // W Farcaster miniapp użytkownik już jest zalogowany
        // Powinniśmy móc pobrać jego dane bezpośrednio z kontekstu
        let attempts = 0;
        const maxAttempts = 100; // Zwiększamy liczbę prób jeszcze bardziej

        const checkContext = () => {
          attempts++;
          try {
            const context = sdk.context;
            console.log(`Context check ${attempts}:`, context);
            console.log('Context keys:', context ? Object.keys(context) : 'null');

            // Sprawdź różne możliwe ścieżki do danych użytkownika
            // W Farcaster miniapp SDK, użytkownik może być w różnych miejscach
            const userData = 
              context?.user || 
              (context as any)?.cast?.author || 
              (context as any)?.interactor ||
              (context as any)?.user?.interactor ||
              (sdk as any).user;

            console.log('User data found:', userData);

            if (userData && userData.fid) {
              console.log('✅ User found in Farcaster context:', userData);
              setUser({
                fid: userData.fid,
                username: userData.username || userData.username || undefined,
                displayName: userData.displayName || userData.display_name || undefined,
              });
              setLoading(false);
              return;
            }

            // Sprawdź czy SDK ma metodę do pobrania użytkownika
            if ((sdk as any).getUser) {
              try {
                const userFromMethod = await (sdk as any).getUser();
                console.log('User from getUser method:', userFromMethod);
                if (userFromMethod && userFromMethod.fid) {
                  setUser({
                    fid: userFromMethod.fid,
                    username: userFromMethod.username,
                    displayName: userFromMethod.displayName,
                  });
                  setLoading(false);
                  return;
                }
              } catch (getUserError) {
                console.log('getUser method not available or failed:', getUserError);
              }
            }

            // Jeśli kontekst istnieje ale nie ma użytkownika, sprawdź czy to miniapp
            if (context && attempts < maxAttempts) {
              // Kontynuuj sprawdzanie kontekstu
              setTimeout(checkContext, 100); // Zmniejszamy interwał do 100ms dla szybszego wykrycia
            } else if (attempts >= maxAttempts) {
              console.log('❌ No user found in Farcaster context after all attempts');
              console.log('Final context:', context);
              // W miniapp kontekście zawsze powinniśmy mieć dostęp do użytkownika
              // Jeśli nie mamy, to znaczy że coś jest nie tak z SDK lub kontekstem
              // Ale nie ustawiamy błędu - pozwalamy aplikacji działać bez użytkownika
              setUser(null);
              setLoading(false);
            }
          } catch (contextError) {
            console.error('Error checking context:', contextError);
            if (attempts < maxAttempts) {
              setTimeout(checkContext, 100);
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

