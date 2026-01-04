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
          setTimeout(() => resolve(void 0), 2000);

          checkReady();
        });
      }

      try {
        // Dynamically import SDK to avoid SSR issues
        const { sdk } = await import('@farcaster/miniapp-sdk');

        console.log('Farcaster SDK loaded, checking user context...');

        // W Farcaster miniapp użytkownik już jest zalogowany
        // Powinniśmy móc pobrać jego dane bezpośrednio z kontekstu
        let attempts = 0;
        const maxAttempts = 50; // Zwiększamy liczbę prób

        const checkContext = () => {
          attempts++;
          try {
            const context = sdk.context;
            console.log(`Context check ${attempts}:`, context);

            // Sprawdź różne możliwe ścieżki do danych użytkownika
            const userData = context?.user || 
                           (context as any)?.cast?.author || 
                           (context as any)?.interactor;

            if (userData && userData.fid) {
              console.log('User found in Farcaster context:', userData);
              setUser({
                fid: userData.fid,
                username: userData.username,
                displayName: userData.displayName || userData.display_name,
              });
              setLoading(false);
              return;
            }

            // Jeśli kontekst istnieje ale nie ma użytkownika, sprawdź czy to miniapp
            if (context && attempts < maxAttempts) {
              // Kontynuuj sprawdzanie kontekstu
              setTimeout(checkContext, 200);
            } else if (attempts >= maxAttempts) {
              console.log('No user found in Farcaster context after all attempts');
              // W miniapp kontekście zawsze powinniśmy mieć dostęp do użytkownika
              // Jeśli nie mamy, to znaczy że coś jest nie tak z SDK lub kontekstem
              // Ale nie ustawiamy błędu - pozwalamy aplikacji działać bez użytkownika
              setUser(null);
              setLoading(false);
            }
          } catch (contextError) {
            console.error('Error checking context:', contextError);
            if (attempts < maxAttempts) {
              setTimeout(checkContext, 200);
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

