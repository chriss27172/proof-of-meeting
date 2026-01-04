import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function MeetingPage({
  params,
}: {
  params: { id: string };
}) {
  const meeting = await prisma.meeting.findUnique({
    where: { id: params.id },
    include: {
      initiator: true,
      participant: true,
      attestation: true,
    },
  });

  if (!meeting) {
    notFound();
  }

  // Find mutual meeting (where initiator and participant are swapped)
  const mutualMeeting = await prisma.meeting.findFirst({
    where: {
      initiatorFid: meeting.participantFid,
      participantFid: meeting.initiatorFid,
      createdAt: {
        // Find meetings created within 1 hour of each other (mutual verification)
        gte: new Date(meeting.createdAt.getTime() - 60 * 60 * 1000),
        lte: new Date(meeting.createdAt.getTime() + 60 * 60 * 1000),
      },
    },
    include: {
      attestation: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {mutualMeeting ? '🤝✨' : (meeting.verificationMethod === 'nfc' ? '📱' : '📷')}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {mutualMeeting ? 'Mutual Verification' : 'Verified Meeting'}
            </h1>
            {mutualMeeting && (
              <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-4">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  ✨ Both parties verified each other simultaneously!
                </p>
              </div>
            )}
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {format(new Date(meeting.createdAt), 'PPp')}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Initiator</h2>
              <Link
                href={`/profile/${meeting.initiator.fid}`}
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
              >
                {meeting.initiator.avatarUrl && (
                  <img
                    src={meeting.initiator.avatarUrl}
                    alt={meeting.initiator.username || `User ${meeting.initiator.fid}`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold text-lg">
                    {meeting.initiator.displayName || meeting.initiator.username || `User ${meeting.initiator.fid}`}
                  </div>
                  {meeting.initiator.username && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      @{meeting.initiator.username}
                    </div>
                  )}
                </div>
              </Link>
            </div>

            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Participant</h2>
              <Link
                href={`/profile/${meeting.participant.fid}`}
                className="flex items-center hover:text-green-600 dark:hover:text-green-400"
              >
                {meeting.participant.avatarUrl && (
                  <img
                    src={meeting.participant.avatarUrl}
                    alt={meeting.participant.username || `User ${meeting.participant.fid}`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold text-lg">
                    {meeting.participant.displayName || meeting.participant.username || `User ${meeting.participant.fid}`}
                  </div>
                  {meeting.participant.username && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      @{meeting.participant.username}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {meeting.location && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600 dark:text-gray-400">📍 {meeting.location}</p>
            </div>
          )}

          {meeting.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">{meeting.notes}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Verification Method</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {meeting.verificationMethod === 'nfc' ? '📱 NFC Tag' : '📷 QR Code'}
            </p>
          </div>

          {mutualMeeting && (
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Mutual Verification</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Your verification of them:
                  </p>
                  <div className="text-green-600 dark:text-green-400 font-semibold">
                    ✓ {meeting.status === 'confirmed' ? 'Confirmed' : meeting.status}
                  </div>
                  {meeting.attestation && (
                    <div className="mt-2 text-xs">
                      <a
                        href={`https://basescan.org/tx/${meeting.attestation.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Attestation →
                      </a>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Their verification of you:
                  </p>
                  <div className="text-green-600 dark:text-green-400 font-semibold">
                    ✓ {mutualMeeting.status === 'confirmed' ? 'Confirmed' : mutualMeeting.status}
                  </div>
                  {mutualMeeting.attestation && (
                    <div className="mt-2 text-xs">
                      <a
                        href={`https://basescan.org/tx/${mutualMeeting.attestation.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Attestation →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {meeting.attestation && !mutualMeeting && (
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">EAS Attestation</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">UID:</span>{' '}
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {meeting.attestation.uid}
                  </code>
                </div>
                {meeting.attestation.txHash && (
                  <div>
                    <span className="font-semibold">Transaction:</span>{' '}
                    <a
                      href={`https://basescan.org/tx/${meeting.attestation.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View on BaseScan
                    </a>
                  </div>
                )}
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Link
              href="/meetings"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              View All Meetings
            </Link>
            <Link
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

