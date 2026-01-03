import { getLeaderboard } from '@/lib/leaderboard';
import Link from 'next/link';

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">🏆 Leaderboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Top users by reputation score
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 dark:bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-right">Reputation</th>
                  <th className="px-6 py-4 text-right">Meetings</th>
                  <th className="px-6 py-4 text-right">Attestations</th>
                  <th className="px-6 py-4 text-right">Trust Level</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {index < 3 && (
                          <span className="text-2xl mr-2">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        )}
                        <span className="font-bold text-lg">#{entry.metrics.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/profile/${entry.user.fid}`}
                        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
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
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-lg">
                        {entry.metrics.reputationScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {entry.metrics.totalMeetings}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {entry.metrics.totalAttestations}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          entry.metrics.trustLevel === 'high'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : entry.metrics.trustLevel === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {entry.metrics.trustLevel.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

