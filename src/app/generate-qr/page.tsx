'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GenerateQRPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current user's FID from API
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Please use the Frame interface in Farcaster or BaseApp to generate your QR code. Your FID is automatically detected when using the Frame.');
          setLoading(false);
        } else if (data.fid) {
          // Redirect to QR page with authenticated FID
          router.push(`/qr-by-fid/${data.fid}`);
        } else {
          setError('Unable to detect your FID. Please use the Frame interface in Farcaster or BaseApp.');
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        setError('Please use the Frame interface in Farcaster or BaseApp to generate your QR code.');
        setLoading(false);
      });
  }, [router]);

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
            <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded mb-6">
              <p className="font-semibold mb-2">⚠️ Security Notice</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-2">
                This prevents fraud - your FID is automatically detected from your Farcaster/BaseApp account.
              </p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">🔒 Why we don't allow manual FID entry:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Prevents fraud - no one can impersonate someone else</li>
              <li>Your FID is automatically detected from your account</li>
              <li>All verifications are authentic and secure</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <Link
              href="/scan"
              className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Scan Someone's QR Code →
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

