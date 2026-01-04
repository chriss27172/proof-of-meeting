'use client';

import { useEffect, useState } from 'react';

export interface FarcasterUser {
  fid: number;
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
        
        // Get user context from Farcaster SDK
        // sdk.context is a synchronous getter
        const context = sdk.context;
        
        if (context?.user) {
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
          });
          setLoading(false);
        } else {
          // Context might not be ready immediately, wait a bit
          const checkContext = () => {
            const delayedContext = sdk.context;
            if (delayedContext?.user) {
              setUser({
                fid: delayedContext.user.fid,
                username: delayedContext.user.username,
                displayName: delayedContext.user.displayName,
              });
              setLoading(false);
            } else {
              // If still no user after delay, it's not available
              setError('User data not available');
              setLoading(false);
            }
          };
          
          // Try after a short delay
          setTimeout(checkContext, 200);
        }
      } catch (err) {
        // SDK might not be available if not running in Farcaster miniapp context
        console.log('Farcaster SDK not available (running outside Farcaster context)');
        setError('Not running in Farcaster miniapp context');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

