'use client';

import { useEffect } from 'react';

export default function FarcasterSDK() {
  useEffect(() => {
    const initSDK = async () => {
      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        await sdk.actions.ready();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('farcaster-sdk-ready'));
        }
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
      }
    };

    initSDK();
  }, []);

  return null;
}
