import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCodeData } from '@/lib/qrCode';

// Dynamic import dla AuthKit (opcjonalny)
let verifySignInMessage: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const authKit = require('@farcaster/auth-kit');
  verifySignInMessage = authKit.verifySignInMessage;
} catch {
  // AuthKit nie jest zainstalowany
  console.error('❌ @farcaster/auth-kit not installed - Sign In endpoint will not work');
}

/**
 * Endpoint do weryfikacji Sign In with Farcaster message
 * Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/auth-kit-provider
 * 
 * AuthKit wysyła POST request z Sign In message do tego endpointu
 * Musimy zweryfikować message i zwrócić odpowiedź
 */
export async function POST(req: NextRequest) {
  try {
    // Sprawdź czy AuthKit jest zainstalowany
    if (!verifySignInMessage) {
      return new Response(
        JSON.stringify({ error: 'AuthKit is not installed. Please install @farcaster/auth-kit' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await req.json();
    const { message, signature } = body;

    if (!message || !signature) {
      return new Response(
        JSON.stringify({ error: 'Message and signature are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Weryfikuj Sign In message
    // Zgodnie z dokumentacją: https://docs.farcaster.xyz/auth-kit/auth-client#verify-sign-in-message
    const domain = process.env.NEXT_PUBLIC_BASE_URL 
      ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname
      : req.headers.get('host') || 'proof-of-meeting.vercel.app';
    
    const siweUri = `${process.env.NEXT_PUBLIC_BASE_URL || `https://${domain}`}/api/auth/signin`;

    try {
      const verifyResult = await verifySignInMessage({
        message,
        signature,
        domain,
        siweUri,
      });

      if (!verifyResult.success || !verifyResult.fid) {
        return new Response(
          JSON.stringify({ error: 'Invalid signature or message' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const fid = verifyResult.fid;
      
      // Pobierz dane użytkownika z Neynar (opcjonalne, jeśli mamy API key)
      let username: string | undefined;
      let displayName: string | undefined;
      
      try {
        const { fetchNeynarUser } = await import('@/lib/neynar');
        const neynarUser = await fetchNeynarUser(fid);
        if (neynarUser) {
          username = neynarUser.username;
          displayName = neynarUser.displayName;
        }
      } catch (neynarError) {
        console.log('⚠️ Could not fetch user from Neynar:', neynarError);
        // Kontynuuj bez danych z Neynar
      }

      // Get or create user in database
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
            displayName: displayName || undefined,
            qrCode: JSON.stringify(qrData),
          },
        });
      } else {
        // Update user data if changed
        const updateData: any = {};
        if (username && user.username !== username) {
          updateData.username = username;
        }
        if (displayName && user.displayName !== displayName) {
          updateData.displayName = displayName;
        }
        
        // Regenerate QR code if username changed
        if (updateData.username) {
          const qrData = generateQRCodeData(fid, username);
          updateData.qrCode = JSON.stringify(qrData);
        }

        if (Object.keys(updateData).length > 0) {
          user = await prisma.user.update({
            where: { fid },
            data: updateData,
          });
        }
      }

      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true,
          fid: user.fid,
          username: user.username,
          displayName: user.displayName,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (verifyError: any) {
      console.error('❌ Error verifying Sign In message:', verifyError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify message: ' + (verifyError.message || 'Unknown error') }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error: any) {
    console.error('❌ Error in /api/auth/signin:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

