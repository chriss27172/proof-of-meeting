import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default async function VerificationCodePage({
  params,
}: {
  params: { id: string };
}) {
  const verificationCode = await prisma.verificationCode.findUnique({
    where: { id: params.id },
    include: {
      creator: true,
    },
  });

  if (!verificationCode) {
    notFound();
  }

  // Check if code is expired
  const isExpired = new Date() > verificationCode.expiresAt;
  const isUsed = verificationCode.used;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">🔢 Your Verification Code</h1>
        
        {isUsed && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded mb-4">
            This code has already been used.
          </div>
        )}

        {isExpired && !isUsed && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            This code has expired. Please generate a new one.
          </div>
        )}

        {!isExpired && !isUsed && (
          <>
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 tracking-widest">
                {verificationCode.code}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Share this code with the person you want to verify
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Code expires in:{' '}
                <span className="font-semibold">
                  {Math.ceil((verificationCode.expiresAt.getTime() - Date.now()) / 60000)} minutes
                </span>
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-left">
                <li>Share this code with the person you met</li>
                <li>They will enter it in the app</li>
                <li>Both of you will be automatically verified!</li>
              </ol>
            </div>
          </>
        )}

        <div className="mt-6">
          <a
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

