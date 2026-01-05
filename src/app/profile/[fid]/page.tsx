import { prisma } from '@/lib/prisma';
import { calculateReputationScore, getReputationNetwork } from '@/lib/reputation';
import { getUserRank } from '@/lib/leaderboard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: { fid: string };
}) {
  const fid = parseInt(params.fid);
  
  if (isNaN(fid)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { fid },
    include: {
      meetingsAsInitiator: {
        where: { status: 'completed' },
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { participant: true },
      },
      meetingsAsParticipant: {
        where: { status: 'completed' },
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { initiator: true },
      },
      reputationsReceived: {
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { ratedBy: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const metrics = await calculateReputationScore(user.id);
  const rank = await getUserRank(user.id);
  const network = await getReputationNetwork(user.id);

  // Get all users who verified meetings with this user (for anti-scam verification)
  const verifiedBy = await prisma.meeting.findMany({
    where: {
      OR: [
        { initiatorFid: fid, status: 'completed' },
        { participantFid: fid, status: 'completed' },
      ],
    },
    include: {
      initiator: true,
      participant: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Create a map of users who verified this user (with meeting count)
  const verifiedByMap = new Map<string, {
    user: any;
    meetings: number;
    lastMeeting: Date;
    verificationMethods: Set<string>;
  }>();

  verifiedBy.forEach((meeting) => {
    const otherUser = meeting.initiatorFid === fid 
      ? meeting.participant 
      : meeting.initiator;
    
    const otherUserId = otherUser.id;
    
    if (!verifiedByMap.has(otherUserId)) {
      verifiedByMap.set(otherUserId, {
        user: otherUser,
        meetings: 0,
        lastMeeting: meeting.createdAt,
        verificationMethods: new Set(),
      });
    }
    
    const entry = verifiedByMap.get(otherUserId)!;
    entry.meetings++;
    entry.verificationMethods.add(meeting.verificationMethod);
    if (meeting.createdAt > entry.lastMeeting) {
      entry.lastMeeting = meeting.createdAt;
    }
  });

  const verifiedByList = Array.from(verifiedByMap.values())
    .sort((a, b) => b.meetings - a.meetings || b.lastMeeting.getTime() - a.lastMeeting.getTime());

  const allMeetings = [
    ...user.meetingsAsInitiator.map(m => ({
      id: m.id,
      otherUser: {
        fid: m.participant.fid,
        username: m.participant.username,
        displayName: m.participant.displayName,
      },
      location: m.location,
      createdAt: m.createdAt,
      verificationMethod: m.verificationMethod,
    })),
    ...user.meetingsAsParticipant.map(m => ({
      id: m.id,
      otherUser: {
        fid: m.initiator.fid,
        username: m.initiator.username,
        displayName: m.initiator.displayName,
      },
      location: m.location,
      createdAt: m.createdAt,
      verificationMethod: m.verificationMethod,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.username || `User ${user.fid}`}
                  className="w-24 h-24 rounded-full mr-6"
                />
              )}
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {user.displayName || user.username || `User ${user.fid}`}
                </h1>
                {user.username && (
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    @{user.username}
                  </p>
                )}
                {user.bio && (
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{user.bio}</p>
                )}
                {user.location && (
                  <p className="text-gray-500 dark:text-gray-500 mt-1">
                    📍 {user.location}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">#{rank}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Rank</div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mt-8">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {metrics.reputationScore.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reputation Score</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {metrics.neynarScore !== null && metrics.neynarScore !== undefined 
                  ? (metrics.neynarScore * 100).toFixed(1) + '%'
                  : 'N/A'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Neynar Score</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {metrics.totalMeetings}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Meetings</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {metrics.totalAttestations}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Attestations</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {metrics.averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>

          <div className="mt-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                metrics.trustLevel === 'high'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : metrics.trustLevel === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {metrics.trustLevel.toUpperCase()} TRUST
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">✅</span>
            Verified By ({verifiedByList.length} {verifiedByList.length === 1 ? 'person' : 'people'})
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Lista osób, które potwierdziły spotkanie z tym użytkownikiem. Pomaga weryfikować autentyczność konta.
          </p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {verifiedByList.length > 0 ? (
              verifiedByList.map((entry) => (
                <Link
                  key={entry.user.id}
                  href={`/profile/${entry.user.fid}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {entry.user.avatarUrl && (
                        <img
                          src={entry.user.avatarUrl}
                          alt={entry.user.username || `User ${entry.user.fid}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div className="font-semibold">
                          {entry.user.displayName || entry.user.username || `User ${entry.user.fid}`}
                        </div>
                        {entry.user.username && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{entry.user.username}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {entry.meetings} {entry.meetings === 1 ? 'meeting' : 'meetings'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Array.from(entry.verificationMethods).map(m => m === 'nfc' ? '📱' : '📷').join(' ')}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(entry.lastMeeting).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Brak zweryfikowanych spotkań. Ten użytkownik nie ma jeszcze potwierdzonych spotkań z innymi osobami.
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Meetings</h2>
            <div className="space-y-4">
              {allMeetings.slice(0, 10).map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/meeting/${meeting.id}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">
                        {meeting.otherUser.displayName || meeting.otherUser.username || `User ${meeting.otherUser.fid}`}
                      </div>
                      {meeting.location && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          📍 {meeting.location}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(meeting.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm">
                      {meeting.verificationMethod === 'nfc' ? '📱 NFC' : '📷 QR'}
                    </div>
                  </div>
                </Link>
              ))}
              {allMeetings.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No meetings yet</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Reputation Network</h2>
            <div className="space-y-4">
              {network.slice(0, 10).map((entry) => (
                <Link
                  key={entry.user.id}
                  href={`/profile/${entry.user.fid}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">
                        {entry.user.displayName || entry.user.username || `User ${entry.user.fid}`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.meetings} meeting{entry.meetings !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {network.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No network connections yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/leaderboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition mr-4"
          >
            View Leaderboard
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

