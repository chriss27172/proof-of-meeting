'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterCodePage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.length !== 5) {
      setError('Code must be exactly 5 digits');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/verification-code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else if (result.meetingId) {
        router.push(`/meeting/${result.meetingId}`);
      } else {
        setError('Unexpected response from server');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error verifying code:', err);
      setError('Failed to verify code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">🔢 Enter Verification Code</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Enter the 5-digit code you received from the other person
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setCode(value);
                setError(null);
              }}
              placeholder="12345"
              maxLength={5}
              required
              className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 5}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

