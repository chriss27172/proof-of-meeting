import { NeynarAPIClient } from '@neynar/nodejs-sdk';

// Initialize Neynar client
// Note: You'll need to set NEYNAR_API_KEY in your environment variables
const getNeynarClient = () => {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    console.warn('NEYNAR_API_KEY not set. Neynar Score will not be available.');
    return null;
  }
  return new NeynarAPIClient(apiKey);
};

/**
 * Fetches Neynar Score for a user by FID
 * @param fid Farcaster ID
 * @returns Neynar Score (0-1) or null if not available
 */
export async function fetchNeynarScore(fid: number): Promise<number | null> {
  try {
    const client = getNeynarClient();
    if (!client) {
      return null;
    }

    // Fetch user by FID
    const response = await client.lookupUserByFid(fid);
    
    // Neynar Score is in experimental.neynar_user_score
    // Handle different possible response structures
    const user = response.result?.user || response.user;
    const neynarScore = user?.experimental?.neynar_user_score;
    
    if (neynarScore !== undefined && neynarScore !== null && typeof neynarScore === 'number') {
      // Ensure score is between 0 and 1
      return Math.max(0, Math.min(1, neynarScore));
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching Neynar Score for FID ${fid}:`, error);
    return null;
  }
}

/**
 * Fetches Neynar Score for multiple users by FIDs
 * @param fids Array of Farcaster IDs
 * @returns Map of FID to Neynar Score
 */
export async function fetchNeynarScores(fids: number[]): Promise<Map<number, number | null>> {
  const scores = new Map<number, number | null>();
  
  // Fetch scores in parallel (with rate limiting consideration)
  const promises = fids.map(async (fid) => {
    const score = await fetchNeynarScore(fid);
    return { fid, score };
  });
  
  const results = await Promise.all(promises);
  results.forEach(({ fid, score }) => {
    scores.set(fid, score);
  });
  
  return scores;
}

/**
 * Fetches user data from Neynar by FID
 * @param fid Farcaster ID
 * @returns User data (username, displayName) or null if not available
 */
export async function fetchNeynarUser(fid: number): Promise<{ username?: string; displayName?: string } | null> {
  try {
    const client = getNeynarClient();
    if (!client) {
      return null;
    }

    // Fetch user by FID
    const response = await client.lookupUserByFid(fid);
    
    // Handle different possible response structures
    const user = response.result?.user || response.user;
    
    if (!user) {
      return null;
    }

    return {
      username: user.username || undefined,
      displayName: user.display_name || user.displayName || undefined,
    };
  } catch (error) {
    console.error(`Error fetching Neynar user data for FID ${fid}:`, error);
    return null;
  }
}

