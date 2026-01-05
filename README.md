# 🤝 Proof of Meeting

A Farcaster Frame v2 miniapp compatible with both **Farcaster** and **BaseAPP** that allows users to verify real-world meetings by scanning QR codes or NFC tags and minting on-chain attestations via EAS (Ethereum Attestation Service) on Base blockchain.

## Features

- **User Profiles**: Each user has a profile with username from Farcaster/BaseApp, reputation score, and meeting history
- **Verified By Section**: See who verified meetings with each user - helps fight scammers and fake accounts
- **QR Code & NFC Support**: Generate QR codes or setup NFC tags for meeting verification
- **EAS Attestations**: Mint on-chain attestations via Ethereum Attestation Service on Base
- **Reputation System**: Build your reputation score through verified meetings and ratings
- **Leaderboard**: Public leaderboard showing top users by reputation score
- **Trust Network**: View your network of verified connections
- **Meeting Verification**: Verify meetings using QR codes or NFC tags
- **Anti-Scam Protection**: Public list of verified meetings helps identify legitimate users

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/proof_of_meeting"
   NEXT_PUBLIC_BASE_URL="https://your-domain.com"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

4. Initialize the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

### For Farcaster Users:
1. Share the Frame URL in a Farcaster cast
2. Users can interact with the Frame directly in Farcaster
3. Generate QR codes/NFC tags, scan codes, view profiles, and check leaderboard all within the Frame

### For BaseAPP Users:
1. The app is fully compatible with BaseAPP's Frame interface
2. All Frame interactions work seamlessly in BaseAPP
3. Users can connect wallets and execute transactions directly

### General Flow:
1. Users can generate their QR code or setup NFC tag in the app
2. When meeting someone, both users scan each other's QR codes or tap NFC tags
3. Confirm the meeting and mint an EAS attestation
4. Build your reputation and climb the leaderboard through verified meetings

## Technical Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- **Farcaster Frame v2** - Full compatibility
- **BaseAPP Frame v2** - Full compatibility
- Base Blockchain (viem)
- EAS (Ethereum Attestation Service)
- Tailwind CSS
- @coinbase/onchainkit (Frame v2 SDK)
- Web NFC API (for NFC support)

## Compatibility

✅ **Farcaster**: Fully compatible with Farcaster Frame v2
✅ **BaseAPP**: Fully compatible with BaseAPP Frame interface
✅ **Base Blockchain**: All transactions execute on Base network
✅ **EAS**: Ethereum Attestation Service integration on Base
✅ **NFC**: Web NFC API support (requires compatible device and browser)

## Environment Variables

- `DATABASE_URL`: PostgreSQL database connection string
- `NEXT_PUBLIC_BASE_URL`: Your application's base URL
- `BASE_RPC_URL`: Base network RPC endpoint (optional, defaults to mainnet)
- `NEYNAR_API_KEY`: Neynar API key for fetching user quality scores (optional, but recommended for reputation system)

## API Endpoints

### Frame Endpoints
- `POST /api/frame` - Main frame handler
- `POST /api/meeting/confirm` - Confirm a meeting after scanning QR/NFC
- `POST /api/meeting/[id]/mint` - Mint attestation

### Profile & Data Endpoints
- `GET /api/profile/[fid]` - Get user profile data
- `GET /api/leaderboard` - Get leaderboard data

### Web Pages
- `/` - Home page with frame metadata
- `/profile/[fid]` - User profile page with "Verified By" section (shows who verified meetings with this user)
- `/leaderboard` - Public leaderboard
- `/qr/[id]` - Display user's QR code
- `/nfc/[id]` - Setup NFC tag
- `/scan` - QR/NFC scanner page
- `/meetings` - Browse all meetings
- `/meeting/[id]` - View meeting details

## Database Schema

- **User**: User profiles with FID, username, QR codes, NFC tags, and reputation metrics
- **Meeting**: Meeting records between two users with verification method
- **Attestation**: EAS attestation records
- **Reputation**: Reputation ratings between users

## Reputation System

Reputation scores are calculated based on:
- **35%** - Number of verified meetings (max 50 meetings = 100 points)
- **25%** - Number of EAS attestations (max 20 attestations = 100 points)
- **25%** - Average rating from other users (max 5.0 rating = 100 points)
- **15%** - Neynar Score (0-1 quality score from Farcaster, with bonus multiplier for higher scores)

The Neynar Score is a quality metric from Neynar that reflects user credibility on Farcaster. Users with higher Neynar Scores receive bonus points in the reputation calculation, making them rank higher on the leaderboard.

Trust levels:
- **High**: Reputation score ≥ 70, ≥ 5 meetings, average rating ≥ 4.0
- **Medium**: Reputation score ≥ 40, ≥ 2 meetings, average rating ≥ 3.0
- **Low**: Below medium thresholds

## Notes

- QR codes and NFC tags are valid for 5 minutes
- Each meeting requires both users to scan each other's QR codes or tap NFC tags
- EAS attestations are minted on Base blockchain
- Reputation scores are cached for performance
- Leaderboard is updated in real-time
- NFC support requires a device with NFC capabilities and a compatible browser

## License

MIT

