'use client';

import { useState, useEffect } from 'react';

/**
 * Hook do Quick Auth - autentykacja użytkownika Farcaster
 * Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/quick-auth
 */
export function useQuickAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        // Sprawdź czy jesteśmy w Mini App
        const isInMiniApp = await sdk.isInMiniApp();
        
        if (!isInMiniApp) {
          setToken(null);
          setLoading(false);
          return;
        }

        // Pobierz token Quick Auth
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/quick-auth/get-token
        const { token: authToken } = await sdk.quickAuth.getToken();
        
        setToken(authToken);
        setLoading(false);
      } catch (err: any) {
        console.error('❌ Quick Auth error:', err);
        setError(err.message || 'Failed to get Quick Auth token');
        setLoading(false);
      }
    };

    getToken();
  }, []);

  /**
   * Wykonaj autentykowany request
   * Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/quick-auth/fetch
   */
  const authenticatedFetch = async (url: string, options?: RequestInit): Promise<Response> => {
    try {
      const { sdk } = await import('@farcaster/miniapp-sdk');
      
      // sdk.quickAuth.fetch automatycznie dodaje token do Authorization header
      return await sdk.quickAuth.fetch(url, options);
    } catch (err: any) {
      console.error('❌ Authenticated fetch error:', err);
      throw err;
    }
  };

  return {
    token,
    loading,
    error,
    authenticatedFetch,
  };
}

