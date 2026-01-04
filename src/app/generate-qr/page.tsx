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
  const [manualFid, setManualFid] = useState<string>('');
  const [manualUsername, setManualUsername] = useState<string>('');
  const [showManualForm, setShowManualForm] = useState(false);

  useEffect(() => {
    if (userLoading) return;

    if (userError || !user?.fid) {
      setError('Unable to detect your Farcaster ID. Please try auto-detection again or enter it manually.');
      setLoading(false);
      setShowManualForm(true); // Show manual form if auto-detection fails
      return;
    }

    // If user is detected, proceed to generate QR code
    generateQrCodeForUser(user.fid, user.username);
  }, [user, userLoading, userError]);

  const generateQrCodeForUser = async (fid: number, username?: string) => {
    setLoading(true);
    setError(null);
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

      setQrData(data.qrCode);
      setLoading(false);
      setShowManualForm(false); // Hide manual form if successful
    } catch (err) {
      console.error('Error creating/getting user:', err);
      setError('Failed to generate QR code');
      setLoading(false);
    }
  };

  const handleManualGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const fidNum = parseInt(manualFid);
    if (isNaN(fidNum)) {
      setError('Please enter a valid Farcaster ID (number).');
      return;
    }
    generateQrCodeForUser(fidNum, manualUsername || undefined);
  };

  const handleTryAutoDetection = () => {
    setLoading(true);
    setError(null);
    setShowManualForm(false);
    // Re-trigger useFarcasterUser by changing a state or key, or simply reload
    window.location.reload();
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

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {showManualForm && !loading && (
            <form onSubmit={handleManualGenerate} className="space-y-4 mb-6">
              <div>
                <label htmlFor="fid" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Farcaster ID (FID)
                </label>
                <input
                  type="number"
                  id="fid"
                  value={manualFid}
                  onChange={(e) => setManualFid(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username (Optional)
                </label>
                <input
                  type="text"
                  id="username"
                  value={manualUsername}
                  onChange={(e) => setManualUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Generate QR Code
              </button>
              <button
                type="button"
                onClick={handleTryAutoDetection}
                className="w-full mt-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Try Auto-Detection Again
              </button>
            </form>
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

