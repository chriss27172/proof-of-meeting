'use client';

import { useEffect, useState } from 'react';

export interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
}

/**
 * Hook to fetch user data from Farcaster MiniApp SDK
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

          // Fallback timeout
          setTimeout(() => resolve(void 0), 2000);

          checkReady();
        });
      }

      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');

        console.log('Farcaster SDK loaded, checking user context...');

        let context = sdk.context;
        console.log('Initial context:', context);

        if (context?.user) {
          console.log('User found in Farcaster context:', context.user);
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
          });
          setLoading(false);
          return;
        }

        // If no user, try to authenticate
        console.log('No user found, attempting to authenticate...');
        try {
          await sdk.actions.authenticate();
          console.log('Authenticate action completed');

          let attempts = 0;
          const maxAttempts = 15;

          const waitForUser = () => {
            attempts++;
            context = sdk.context;
            console.log(`Authenticate attempt ${attempts}, context:`, context);

            if (context?.user) {
              console.log('User found after authenticate:', context.user);
              setUser({
                fid: context.user.fid,
                username: context.user.username,
                displayName: context.user.displayName,
              });
              setLoading(false);
            } else if (attempts < maxAttempts) {
              setTimeout(waitForUser, 300);
            } else {
              console.log('User not found after authenticate attempts');
              setError('Please complete authentication to continue');
              setUser(null);
              setLoading(false);
            }
          };
          setTimeout(waitForUser, 500);
        } catch (authError) {
          console.log('Authenticate not available or failed:', authError);
          setError('Authentication failed or not available in this context.');
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Farcaster SDK initialization error:', err);
        setError('Farcaster SDK not available');
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
