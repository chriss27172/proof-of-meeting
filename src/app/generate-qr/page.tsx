'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GenerateQRPage() {
  const router = useRouter();
  const [fid, setFid] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!fid || isNaN(parseInt(fid))) {
      setError('Please enter a valid FID (Farcaster ID)');
      return;
    }

    // Redirect to QR page - we'll need to fetch user by FID first
    router.push(`/qr-by-fid/${fid}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl font-bold mb-2">Generate QR Code</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your Farcaster ID to generate your QR code
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Farcaster ID (FID)
            </label>
            <input
              type="number"
              value={fid}
              onChange={(e) => {
                setFid(e.target.value);
                setError(null);
              }}
              placeholder="Enter your FID"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              You can find your FID in Farcaster or BaseApp profile
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!fid}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition mb-4"
          >
            Generate QR Code
          </button>

          <div className="text-center">
            <Link
              href="/scan"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Or scan someone else's QR code →
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

