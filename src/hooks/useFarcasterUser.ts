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
          setTimeout(() => resolve(void 0), 1000);

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
        const maxAttempts = 25;

        const checkContext = () => {
          attempts++;
          const context = sdk.context;
          console.log(`Context check ${attempts}:`, context);

          if (context?.user && context.user.fid) {
            console.log('User found in Farcaster context:', context.user);
            setUser({
              fid: context.user.fid,
              username: context.user.username,
              displayName: context.user.displayName,
            });
            setLoading(false);
          } else if (attempts < maxAttempts) {
            // Kontynuuj sprawdzanie kontekstu
            setTimeout(checkContext, 150);
          } else {
            console.log('No user found in Farcaster context after all attempts');
            // W miniapp kontekście zawsze powinniśmy mieć dostęp do użytkownika
            // Jeśli nie mamy, to znaczy że coś jest nie tak z SDK lub kontekstem
            setError('Unable to access Farcaster user data. Please make sure you\'re using the app from within Farcaster.');
            setUser(null);
            setLoading(false);
          }
        };

        // Rozpocznij sprawdzanie kontekstu od razu
        checkContext();

      } catch (err) {
        console.error('Farcaster SDK initialization error:', err);
        setError('Farcaster SDK not available. Please make sure you\'re using the app from Farcaster.');
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

