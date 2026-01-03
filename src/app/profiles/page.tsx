import { prisma } from '@/lib/prisma';
import { calculateReputationScore } from '@/lib/reputation';
import { getUserRank } from '@/lib/leaderboard';
import Link from 'next/link';

export default async function ProfilesPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const search = searchParams.search || '';
  const page = parseInt(searchParams.page || '1');
  const perPage = 20;
  const skip = (page - 1) * perPage;

  // Build where clause for search (SQLite doesn't support case-insensitive mode)
  const where = search
    ? {
        OR: [
          { username: { contains: search } },
          { displayName: { contains: search } },
          isNaN(parseInt(search)) ? undefined : { fid: parseInt(search) },
        ].filter((item): item is any => item !== undefined),
      }
    : {};

  // Get total count for pagination
  const totalUsers = await prisma.user.count({ where });

  // Get users with pagination
  const users = await prisma.user.findMany({
    where,
    orderBy: { reputationScore: 'desc' },
    skip,
    take: perPage,
  });

  // Calculate metrics for each user
  const usersWithMetrics = await Promise.all(
    users.map(async (user) => {
      const metrics = await calculateReputationScore(user.id);
      const rank = await getUserRank(user.id);
      return {
        ...user,
        metrics,
        rank,
      };
    })
  );

  const totalPages = Math.ceil(totalUsers / perPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">👥 Browse Profiles</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore all users and check their reputation
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form method="get" className="flex gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by username, display name, or FID..."
              defaultValue={search}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Search
            </button>
            {search && (
              <Link
                href="/profiles"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          {totalUsers === 0 ? (
            <p>No users found</p>
          ) : (
            <p>
              Showing {skip + 1}-{Math.min(skip + perPage, totalUsers)} of {totalUsers} users
            </p>
          )}
        </div>

        {/* Users Grid */}
        {usersWithMetrics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {usersWithMetrics.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.fid}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {user.avatarUrl && (
                      <img
                        src={user.avatarUrl}
                        alt={user.username || `User ${user.fid}`}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">
                        {user.displayName || user.username || `User ${user.fid}`}
                      </h3>
                      {user.username && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        FID: {user.fid}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">#{user.rank}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {user.metrics.reputationScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Reputation</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {user.metrics.totalMeetings}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Meetings</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.metrics.trustLevel === 'high'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : user.metrics.trustLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {user.metrics.trustLevel.toUpperCase()} TRUST
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    View Profile →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {search ? 'No users found matching your search.' : 'No users yet.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {page > 1 && (
              <Link
                href={`/profiles?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                ← Previous
              </Link>
            )}
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-2 px-4 rounded-lg">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/profiles?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Next →
              </Link>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Back to Home
            </Link>
            <Link
              href="/leaderboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

