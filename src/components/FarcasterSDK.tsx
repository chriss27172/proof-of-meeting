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

        // Sprawdź czy jesteśmy w Mini App
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/is-in-mini-app
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('FarcasterSDK: Is in Mini App:', isInMiniApp);

        if (isInMiniApp) {
          // W Mini App, sprawdź czy context jest dostępny
          // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/sdk/context
          // Context jest dostępny od razu, ale może potrzebować czasu na inicjalizację
          try {
            const context = await sdk.context;
            console.log('FarcasterSDK: Context available:', {
              hasUser: !!context?.user,
              hasFid: !!context?.user?.fid,
              userFid: context?.user?.fid,
            });

            // Jeśli użytkownik jest dostępny, dispatch event z informacją
            if (context?.user?.fid) {
              window.dispatchEvent(new CustomEvent('farcaster-user-available', {
                detail: { user: context.user }
              }));
            }

            // Poczekaj chwilę na pełną inicjalizację context
            // To daje czas na pobranie użytkownika przez useFarcasterUser
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (contextError) {
            console.warn('FarcasterSDK: Context not immediately available:', contextError);
            // Kontynuuj - context może być dostępny później
          }
        }

        // Call ready() after app is fully loaded and user context is checked
        // Zgodnie z przykładem Quick Auth: ready() powinno być wywoływane PO pobraniu danych
        // https://miniapps.farcaster.xyz/docs/sdk/quick-auth
        // Ale zgodnie z dokumentacją Getting Started: ready() ukrywa splash screen
        // https://miniapps.farcaster.xyz/docs/getting-started
        // Wywołujemy ready() tutaj, ale użytkownik powinien być już pobrany przez useFarcasterUser
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
