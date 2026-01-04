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

  useEffect(() => {
    if (userLoading) return;

    if (userError || !user) {
      setError('Unable to detect your FID. Please make sure you are using the app from Farcaster or BaseApp.');
      setLoading(false);
      return;
    }

    // Create or get user in database
    const createOrGetUser = async () => {
      try {
        const response = await fetch('/api/user/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fid: user.fid, username: user.username }),
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
            fid: user.fid,
            username: user.username,
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

    createOrGetUser();
  }, [user, userLoading, userError]);

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

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              <p className="text-sm">{error}</p>
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
            </div>
          )}

          <div className="text-center space-y-4 mt-6">
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
