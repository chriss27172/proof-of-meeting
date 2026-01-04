'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFarcasterUser } from '@/hooks/useFarcasterUser';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function GenerateQRPage() {
  const router = useRouter();
  const { user, loading: userLoading, error: userError } = useFarcasterUser();
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manualFid, setManualFid] = useState('');
  const [manualUsername, setManualUsername] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  useEffect(() => {
    console.log('GenerateQR useEffect - user:', user, 'loading:', userLoading, 'error:', userError);
    
    if (userLoading) {
      setLoading(true);
      return;
    }

    // Jeśli użytkownik jest wykryty, użyj jego danych
    if (user && user.fid) {
      console.log('✅ User detected, creating/getting user data:', user);
      // User data available from SDK
      createOrGetUserFromData(user.fid, user.username);
      return;
    }

    // Jeśli nie ma błędu i nie ma użytkownika, czekaj jeszcze chwilę
    // (SDK może potrzebować więcej czasu na załadowanie w miniapp)
    if (!userError && !user) {
      console.log('⏳ Waiting for user detection...');
      const timeout = setTimeout(() => {
        console.log('⏰ Timeout reached, user still not detected');
        // Po 10 sekundach, jeśli nadal nie ma użytkownika, pozwól na ręczne wprowadzenie
        // (ale tylko jeśli nie jesteśmy w miniapp - w miniapp powinniśmy zawsze mieć użytkownika)
        setShowManualInput(true);
        setLoading(false);
      }, 10000); // Zwiększamy timeout do 10 sekund

      return () => clearTimeout(timeout);
    }

    // Jeśli jest błąd lub użytkownik nie został wykryty, pozwól na ręczne wprowadzenie
    if (userError || (!user && !userLoading)) {
      console.log('❌ User not detected, showing manual input');
      setShowManualInput(true);
      setLoading(false);
    }
  }, [user, userLoading, userError]);

  const createOrGetUserFromData = async (fid: number, username?: string) => {
    try {
      const response = await fetch('/api/user/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid, username }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Get QR code from user data or generate new one
      if (data.qrCode) {
        setQrData(data.qrCode);
      } else {
        // Fallback: generate QR code data client-side
        const qrCodeData = {
          fid,
          username,
          qrId: crypto.randomUUID(),
          timestamp: Date.now(),
        };
        setQrData(JSON.stringify(qrCodeData));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error creating/getting user:', err);
      setError('Failed to generate QR code');
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fid = parseInt(manualFid);

    if (!fid || isNaN(fid)) {
      setError('Please enter a valid FID');
      return;
    }

    setError(null);
    setLoading(true);
    setShowManualInput(false);

    createOrGetUserFromData(fid, manualUsername.trim() || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl font-bold mb-2">Generate QR Code</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your QR code is generated automatically from your Farcaster ID
            </p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="text-2xl mb-4">⏳</div>
              <p className="text-gray-600 dark:text-gray-400">Loading your QR code...</p>
            </div>
          )}

          {error && !showManualInput && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              <p className="text-sm">{error}</p>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => setShowManualInput(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded transition mr-2"
                >
                  Enter Manually
                </button>
                {error.includes('wallet') && (
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded transition"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}

          {showManualInput && (
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Enter Your Farcaster ID</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Since automatic detection failed, please enter your FID manually.
                You can find your FID on your Farcaster profile or in your settings.
              </p>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">FID (Farcaster ID) *</label>
                  <input
                    type="number"
                    value={manualFid}
                    onChange={(e) => setManualFid(e.target.value)}
                    placeholder="12345"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username (optional)</label>
                  <input
                    type="text"
                    value={manualUsername}
                    onChange={(e) => setManualUsername(e.target.value)}
                    placeholder="@username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                  >
                    {loading ? 'Generating...' : 'Generate QR Code'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualInput(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {qrData && user && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <QRCodeDisplay data={qrData} size={256} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-semibold mb-2">FID: {user.fid}</p>
                    {user.username && (
                      <p className="mb-2">Username: @{user.username}</p>
                    )}
                    <p className="text-xs">
                      This QR code expires in 5 minutes. Refresh to generate a new one.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">How to use:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>Show this QR code to the person you're meeting</li>
                  <li>They scan it using the "Scan QR/NFC" button</li>
                  <li>Both of you will be automatically verified!</li>
                </ol>
              </div>

              <div className="text-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Generate New QR Code
                </button>
              </div>
            </div>
          )}

          <div className="text-center space-y-4 mt-6">
            {!qrData && !loading && !showManualInput && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowManualInput(true)}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Enter FID Manually
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Try Auto-Detection Again
                </button>
              </div>
            )}
            <Link
              href="/scan"
              className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Scan QR/NFC →
            </Link>
            <Link
              href="/"
              className="block text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
