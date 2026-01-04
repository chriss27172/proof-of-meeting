'use client';

import { useUser } from '@/contexts/UserContext';

export default function UserGreeting() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-8 text-center">
        <p className="text-blue-800 dark:text-blue-200">Loading user data...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 mb-8 text-center">
        <p className="text-yellow-800 dark:text-yellow-200">
          Welcome to Proof of Meeting! Please use this app in Farcaster or BaseApp to access your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-8 text-center">
      <p className="text-green-800 dark:text-green-200 text-lg font-semibold">
        Welcome {user.displayName || user.username || `User ${user.fid}`}!
        {user.fid && <span className="text-sm ml-2">(FID: {user.fid})</span>}
      </p>
      {user.username && (
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          @{user.username}
        </p>
      )}
    </div>
  );
}
