import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { generateQRCodeData } from '@/lib/qrCode';

export default async function QRPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  // Parse or generate QR code data
  let qrData;
  try {
    qrData = JSON.parse(user.qrCode);
  } catch {
    qrData = generateQRCodeData(user.fid, user.username || undefined);
  }

  const qrString = JSON.stringify(qrData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">📷 Your QR Code</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Let others scan this to confirm a meeting
        </p>
        
        <div className="flex justify-center mb-6">
          <QRCodeDisplay data={qrString} size={300} />
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">FID</div>
          <div className="font-bold">{user.fid}</div>
          {user.username && (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 mt-2">Username</div>
              <div className="font-bold">{user.username}</div>
            </>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          This QR code is valid for 5 minutes. Refresh to generate a new one.
        </p>
      </div>
    </div>
  );
}

