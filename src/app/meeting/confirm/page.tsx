'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { parseQRCodeData, validateQRCode } from '@/lib/qrCode';
import { parseNFCTagData, validateNFCTag } from '@/lib/nfc';

export default function ConfirmMeetingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    const method = searchParams.get('method') || 'qr';

    if (!data) {
      setError('No verification data provided');
      setLoading(false);
      return;
    }

    // Validate data
    let parsedData;
    if (method === 'nfc') {
      parsedData = parseNFCTagData(data);
      if (!parsedData || !validateNFCTag(parsedData)) {
        setError('Invalid or expired NFC tag');
        setLoading(false);
        return;
      }
    } else {
      parsedData = parseQRCodeData(data);
      if (!parsedData || !validateQRCode(parsedData)) {
        setError('Invalid or expired QR code');
        setLoading(false);
        return;
      }
    }

    // Submit to API
    fetch('/api/meeting/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, method }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else if (result.meetingId) {
          router.push(`/meeting/${result.meetingId}`);
        }
      })
      .catch(err => {
        console.error('Error confirming meeting:', err);
        setError('Failed to confirm meeting');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-xl">Confirming meeting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/scan')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

