import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function MeetingsPage() {
  const meetings = await prisma.meeting.findMany({
    where: {
      status: 'completed',
    },
    include: {
      initiator: true,
      participant: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">🤝 Verified Meetings</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            All verified meetings with EAS attestations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/meeting/${meeting.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {meeting.verificationMethod === 'nfc' ? '📱' : '📷'}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {meeting.initiator.displayName || meeting.initiator.username || `User ${meeting.initiator.fid}`}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      & {meeting.participant.displayName || meeting.participant.username || `User ${meeting.participant.fid}`}
                    </div>
                  </div>
                </div>
              </div>
              
              {meeting.location && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  📍 {meeting.location}
                </div>
              )}
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(meeting.createdAt), 'PPp')}
              </div>
              
              {meeting.attestationId && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    ✓ EAS Attestation Verified
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {meetings.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤝</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No verified meetings yet
            </p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

