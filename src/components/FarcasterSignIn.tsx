'use client';

import { useUser } from '@/contexts/UserContext';
import { useState, useEffect } from 'react';

// Dynamic import dla AuthKit (opcjonalny)
let SignInButton: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const authKit = require('@farcaster/auth-kit');
  SignInButton = authKit.SignInButton;
} catch {
  // AuthKit nie jest zainstalowany
  console.log('⚠️ @farcaster/auth-kit not installed - SignInButton will not be available');
}

/**
 * Komponent Sign In Button dla Farcaster AuthKit
 * Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/sign-in-button
 * 
 * Wyświetla przycisk logowania dla użytkowników, którzy nie są w Mini App
 * W Mini App użytkownik jest automatycznie rozpoznawany przez sdk.context.user
 */
export default function FarcasterSignIn() {
  const { user, loading } = useUser();
  const [isInMiniApp, setIsInMiniApp] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMiniApp = async () => {
      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        const inMiniApp = await sdk.isInMiniApp();
        setIsInMiniApp(inMiniApp);
      } catch {
        setIsInMiniApp(false);
      }
    };
    checkMiniApp();
  }, []);

  // Jeśli jesteśmy w Mini App, nie pokazuj przycisku logowania
  // Użytkownik jest automatycznie rozpoznawany
  if (isInMiniApp === true) {
    return null;
  }

  // Jeśli użytkownik jest już zalogowany, nie pokazuj przycisku
  if (user && user.fid) {
    return null;
  }

  // Jeśli jeszcze ładujemy, nie pokazuj przycisku
  if (loading || isInMiniApp === null) {
    return null;
  }

  // Jeśli SignInButton nie jest dostępny (AuthKit nie zainstalowany), nie pokazuj przycisku
  if (!SignInButton) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-8 text-center">
      <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">
        Sign In with Farcaster
      </h3>
      <p className="text-blue-700 dark:text-blue-300 mb-4">
        Log in with your Farcaster account to access all features
      </p>
      <div className="flex justify-center">
        <SignInButton
          onSuccess={({ fid, username }) => {
            console.log(`✅ Signed in successfully! FID: ${fid}, Username: ${username}`);
            // useProfile hook automatycznie zaktualizuje stan użytkownika
            window.location.reload(); // Odśwież aby załadować dane użytkownika
          }}
          onError={(error) => {
            console.error('❌ Sign in error:', error);
          }}
        />
      </div>
      <p className="text-sm text-blue-600 dark:text-blue-400 mt-4">
        Or use this app in Farcaster Mini App for automatic login
      </p>
    </div>
  );
}

