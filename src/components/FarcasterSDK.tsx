'use client';

import { useEffect } from 'react';

/**
 * Farcaster MiniApp SDK Integration
 * Calls sdk.actions.ready() after the app is fully loaded to hide the splash screen
 * See: https://miniapps.farcaster.xyz/docs/getting-started#making-your-app-display
 */
export default function FarcasterSDK() {
  useEffect(() => {
    const initSDK = async () => {
      try {
        // Dynamically import SDK to avoid SSR issues
        const { sdk } = await import('@farcaster/miniapp-sdk');

        console.log('FarcasterSDK: Initializing SDK...');

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
          });
        }

        // Additional delay for React hydration to complete
        await new Promise(resolve => setTimeout(resolve, 100));

        // Call ready() after app is fully loaded
        // This hides the splash screen and displays the app content
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/getting-started
        try {
          await Promise.race([
            sdk.actions.ready(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('ready() timeout')), 5000)
            )
          ]);
          console.log('FarcasterSDK: SDK ready - splash screen hidden');
        } catch (readyError: any) {
          console.error('FarcasterSDK: Error calling ready():', readyError);
          // Aplikacja powinna działać nawet jeśli ready() się nie powiedzie
        }

        // Dispatch custom event to notify other components that SDK is ready
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('farcaster-sdk-ready'));
        }
      } catch (error) {
        // SDK might not be available if not running in Farcaster miniapp context
        // This is fine - the app will still work in regular browsers
        if (error instanceof Error && error.message.includes('farcaster')) {
          console.log('FarcasterSDK: SDK not available (running outside Farcaster context)');
        } else {
          console.error('FarcasterSDK: Error initializing SDK:', error);
        }
      }
    };

    initSDK();
  }, []);

  return null; // This component doesn't render anything
}
