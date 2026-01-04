'use client';

import { useEffect, useState } from 'react';

export interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
}

/**
 * Hook do pobierania danych użytkownika z Farcaster MiniApp SDK
 */
export function useFarcasterUser() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Dynamically import SDK to avoid SSR issues
        const { sdk } = await import('@farcaster/miniapp-sdk');

        // Try multiple times to get user context
        let attempts = 0;
        const maxAttempts = 10;

        const checkContext = () => {
          attempts++;
          const context = sdk.context;

          if (context?.user) {
            setUser({
              fid: context.user.fid,
              username: context.user.username,
              displayName: context.user.displayName,
            });
            setLoading(false);
          } else if (attempts < maxAttempts) {
            // Try again after a short delay
            setTimeout(checkContext, 100);
          } else {
            // If still no user after all attempts, allow manual input
            console.log('User context not available, allowing manual input');
            setUser(null); // Allow manual input
            setLoading(false);
          }
        };

        // Start checking context
        checkContext();
      } catch (err) {
        // SDK might not be available if not running in Farcaster miniapp context
        console.log('Farcaster SDK not available (running outside Farcaster context)', err);
        setError('Not running in Farcaster miniapp context');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

