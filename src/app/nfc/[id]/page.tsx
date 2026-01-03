'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { writeToNFCTag, generateNFCTagData } from '@/lib/nfc';

export default function NFCPage() {
  const params = useParams();
  const [writing, setWriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data - params.id could be user ID or FID
    // Try as FID first
    const fid = parseInt(params.id as string);
    if (!isNaN(fid)) {
      fetch(`/api/profile/${fid}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUserData(data.user);
          }
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    }
  }, [params.id]);

  const handleWriteNFC = async () => {
    if (!('NDEFWriter' in window)) {
      setError('NFC is not supported in this browser. Please use a device with NFC support.');
      return;
    }

    if (!userData) {
      setError('User data not loaded. Please refresh the page.');
      return;
    }

    setWriting(true);
    setError(null);

    try {
      const nfcData = generateNFCTagData(userData.fid, userData.username);
      const success = await writeToNFCTag(nfcData);
      
      if (success) {
        setSuccess(true);
      } else {
        setError('Failed to write to NFC tag. Please try again.');
      }
    } catch (err) {
      console.error('Error writing to NFC:', err);
      setError('An error occurred while writing to NFC tag.');
    } finally {
      setWriting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">📱 Setup NFC Tag</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Write your meeting data to an NFC tag
        </p>

        {userData && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">FID</div>
            <div className="font-bold">{userData.fid}</div>
            {userData.username && (
              <>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 mt-2">Username</div>
                <div className="font-bold">{userData.username}</div>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
            ✓ Successfully wrote to NFC tag!
          </div>
        )}

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-6">
          <div className="text-6xl mb-4">📱</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {writing
              ? 'Hold your device near the NFC tag...'
              : 'Click the button below and hold your device near an NFC tag'}
          </p>
          <button
            onClick={handleWriteNFC}
            disabled={writing || !userData}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {writing ? 'Writing...' : 'Write to NFC Tag'}
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Note: NFC writing requires a device with NFC support and appropriate browser permissions.
        </p>
      </div>
    </div>
  );
}

