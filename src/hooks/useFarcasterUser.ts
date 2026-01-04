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
        // Dynamically import SDK to avoid SSR issues
        const { sdk } = await import('@farcaster/miniapp-sdk');

        console.log('Farcaster SDK loaded, attempting to get user data...');

        // First, try to get user from context
        let context = sdk.context;
        console.log('Initial context:', context);

        if (context?.user) {
          console.log('User found immediately:', context.user);
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
          });
          setLoading(false);
          return;
        }

        // If no user, try sign in
        console.log('No user found, attempting sign in...');
        try {
          await sdk.actions.signIn();
          console.log('Sign in action completed');

          // Wait for context to update
          let attempts = 0;
          const maxAttempts = 15;

          const waitForUser = () => {
            attempts++;
            context = sdk.context;
            console.log(`Sign in attempt ${attempts}, context:`, context);

            if (context?.user) {
              console.log('User found after sign in:', context.user);
              setUser({
                fid: context.user.fid,
                username: context.user.username,
                displayName: context.user.displayName,
              });
              setLoading(false);
            } else if (attempts < maxAttempts) {
              setTimeout(waitForUser, 300);
            } else {
              console.log('User not found after sign in attempts');
              setError('Please complete sign in to continue');
              setUser(null);
              setLoading(false);
            }
          };

          setTimeout(waitForUser, 500);
        } catch (signInError) {
          console.log('Sign in not available or failed:', signInError);

          // Fallback: just wait for context to be available
          let attempts = 0;
          const maxAttempts = 20;

          const waitForContext = () => {
            attempts++;
            context = sdk.context;
            console.log(`Context check ${attempts}:`, context);

            if (context?.user) {
              console.log('User found in context:', context.user);
              setUser({
                fid: context.user.fid,
                username: context.user.username,
                displayName: context.user.displayName,
              });
              setLoading(false);
            } else if (attempts < maxAttempts) {
              setTimeout(waitForContext, 200);
            } else {
              console.log('Context not available after all attempts');
              setError('Unable to access Farcaster user data. Please try refreshing the page.');
              setUser(null);
              setLoading(false);
            }
          };

          setTimeout(waitForContext, 200);
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

