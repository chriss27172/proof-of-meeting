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
        
        // Call ready() after app is fully loaded
        // This hides the splash screen and displays the app content
        await sdk.actions.ready();
        
        console.log('Farcaster SDK ready - splash screen hidden');
      } catch (error) {
        // SDK might not be available if not running in Farcaster miniapp context
        // This is fine - the app will still work in regular browsers
        if (error instanceof Error && error.message.includes('farcaster')) {
          console.log('Farcaster SDK not available (running outside Farcaster context)');
        } else {
          console.error('Error initializing Farcaster SDK:', error);
        }
      }
    };

    initSDK();
  }, []);

  return null; // This component doesn't render anything
}

