import { prisma } from '@/lib/prisma';
import { generateQRCodeData } from '@/lib/qrCode';
import { notFound, redirect } from 'next/navigation';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default async function QRByFidPage({
  params,
}: {
  params: { fid: string };
}) {
  const fid = parseInt(params.fid);
  
  if (isNaN(fid)) {
    notFound();
  }

  // Get or create user
  let user = await prisma.user.findUnique({
    where: { fid },
  });

  if (!user) {
    // Create user with QR code
    const qrData = generateQRCodeData(fid);
    user = await prisma.user.create({
      data: {
        fid,
        qrCode: JSON.stringify(qrData),
      },
    });
  }

  // Parse QR code data
  let qrData;
  try {
    qrData = JSON.parse(user.qrCode);
  } catch {
    // Regenerate if invalid
    qrData = generateQRCodeData(fid, user.username || undefined);
    user = await prisma.user.update({
      where: { id: user.id },
      data: { qrCode: JSON.stringify(qrData) },
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl font-bold mb-2">Your QR Code</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Show this QR code to others to verify your meeting
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="mb-4">
                <QRCodeDisplay value={JSON.stringify(qrData)} size={256} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold mb-2">FID: {fid}</p>
                {user.username && (
                  <p className="mb-2">Username: @{user.username}</p>
                )}
                <p className="text-xs">
                  This QR code expires in 5 minutes. Refresh the page to generate a new one.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Show this QR code to the person you're meeting</li>
              <li>They scan it using the "Scan QR/NFC" button</li>
              <li>Both of you will be automatically verified!</li>
              <li>You can mint EAS attestations to build your reputation</li>
            </ol>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="/scan"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Scan Someone's QR
            </a>
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

