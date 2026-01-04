import { type NextRequest } from 'next/server';
import { getFrameMessage } from '@coinbase/onchainkit';

export async function GET(req: NextRequest) {
  try {
    // Try to get FID from Frame message (if accessed from Frame)
    // Note: This won't work for regular browser requests, but that's intentional
    // Users should use the Frame interface for security
    
    // For Frame requests, we'd need the POST body, but GET doesn't have it
    // So we return an error for regular browser requests
    return new Response(
      JSON.stringify({ 
        error: 'Please use the Frame interface in Farcaster or BaseApp. Your FID is automatically detected.',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Unable to authenticate' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fid, username } = body;
    
    if (!fid || typeof fid !== 'number') {
      return new Response(
        JSON.stringify({ 
          error: 'FID is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Import prisma
    const { prisma } = await import('@/lib/prisma');
    const { generateQRCodeData } = await import('@/lib/qrCode');

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { fid },
    });

    if (!user) {
      // Create new user with QR code
      const qrData = generateQRCodeData(fid, username);
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

    // Parse QR code data
    let qrCodeData;
    try {
      qrCodeData = JSON.parse(user.qrCode);
    } catch {
      // Regenerate if invalid
      qrCodeData = generateQRCodeData(user.fid, user.username || undefined);
      user = await prisma.user.update({
        where: { id: user.id },
        data: { qrCode: JSON.stringify(qrCodeData) },
      });
    }

    return new Response(
      JSON.stringify({ 
        fid: user.fid,
        username: user.username,
        qrCode: user.qrCode,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in /api/user/me POST:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to authenticate' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

