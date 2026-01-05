import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { prisma } from '@/lib/prisma';
import { generateQRCodeData } from '@/lib/qrCode';
import { calculateReputationScore } from '@/lib/reputation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const frameData = await getFrameMessage(body);
    
    // Support both Farcaster and BaseAPP
    if (!frameData?.isValid || !frameData.message) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Try Again',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Invalid+frame+message`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    const fid = frameData.message.interactor.fid;
    const buttonIndex = frameData.message.button;
    
    // Try to get username from existing user in database
    // Note: Frame API doesn't provide username directly, but we can get it from database
    // or it will be set when user uses the Mini App (which has access to sdk.context.user.username)
    let username: string | null = null;
    const existingUser = await prisma.user.findUnique({
      where: { fid },
      select: { username: true },
    });
    if (existingUser?.username) {
      username = existingUser.username;
    }

    // Main menu
    if (!buttonIndex) {
      // Get or create user
      let user = await prisma.user.findUnique({
        where: { fid },
      });

      if (!user) {
        const qrData = generateQRCodeData(fid, username || undefined);
        user = await prisma.user.create({
          data: {
            fid,
            username: username || undefined,
            qrCode: JSON.stringify(qrData),
          },
        });
      } else if (username && user.username !== username) {
        // Update username if changed
        user = await prisma.user.update({
          where: { fid },
          data: { username },
        });
      }

      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'My Profile',
            },
            {
              label: 'Browse Profiles',
            },
            {
              label: 'Show QR/NFC',
            },
            {
              label: 'Scan QR/NFC',
            },
            {
              label: 'Generate Code',
            },
            {
              label: 'Enter Code',
            },
            {
              label: 'Leaderboard',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // My Profile
    if (buttonIndex === 1) {
      let user = await prisma.user.findUnique({
        where: { fid },
      });

      if (!user) {
        const qrData = generateQRCodeData(fid, username || undefined);
        user = await prisma.user.create({
          data: {
            fid,
            username: username || undefined,
            qrCode: JSON.stringify(qrData),
          },
        });
      }

      const metrics = await calculateReputationScore(user.id);

      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View Full Profile',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.fid}`,
            },
            {
              label: 'My Meetings',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meetings`,
            },
            {
              label: 'Leaderboard',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/profile?fid=${fid}&score=${metrics.reputationScore.toFixed(1)}&meetings=${metrics.totalMeetings}&attestations=${metrics.totalAttestations}&rating=${metrics.averageRating.toFixed(1)}&level=${metrics.trustLevel}`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Browse Profiles
    if (buttonIndex === 2) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View All Profiles',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/profiles`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Show QR/NFC
    if (buttonIndex === 3) {
      let user = await prisma.user.findUnique({
        where: { fid },
      });

      if (!user) {
        const qrData = generateQRCodeData(fid, username || undefined);
        user = await prisma.user.create({
          data: {
            fid,
            username: username || undefined,
            qrCode: JSON.stringify(qrData),
          },
        });
      }

      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View QR Code',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/qr/${user.id}`,
            },
            {
              label: 'Setup NFC',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/nfc/${user.id}`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/qr?fid=${fid}`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Scan QR/NFC
    if (buttonIndex === 4) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Open Scanner',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/scan`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/scan`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Generate Code
    if (buttonIndex === 5) {
      // Redirect to generate code endpoint
      const generateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verification-code/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      if (generateResponse.ok) {
        const result = await generateResponse.text();
        return new Response(result, {
          headers: { 'Content-Type': 'text/html' },
        });
      }
      
      return new Response(
        getFrameHtmlResponse({
          buttons: [{ label: 'Back' }],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Failed+to+generate+code`,
            aspectRatio: '1.91:1',
          },
        }),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Enter Code
    if (buttonIndex === 6) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Enter Code',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/enter-code`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/enter-code`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Leaderboard
    if (buttonIndex === 7) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View Leaderboard',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/leaderboard`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    return new Response(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Back to Menu',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
          aspectRatio: '1.91:1',
        },
      }),
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Error in frame route:', error);
    return new Response('Error processing request', { status: 500 });
  }
}

