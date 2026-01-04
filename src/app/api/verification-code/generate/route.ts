import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { prisma } from '@/lib/prisma';
import { generateVerificationCode, getDefaultExpiration } from '@/lib/verificationCode';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Try to get frame data
    let fid: number | null = null;
    try {
      const frameData = await getFrameMessage(body);
      if (frameData?.isValid && frameData.message) {
        fid = frameData.message.interactor.fid;
      }
    } catch {
      // Not a frame request, continue with regular API
    }

    if (!fid) {
      // For non-frame requests, we need FID from session/auth
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please use the Frame interface.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { fid },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found. Please create a profile first.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate unique code
    let code: string;
    let attempts = 0;
    do {
      code = generateVerificationCode();
      attempts++;
      if (attempts > 100) {
        throw new Error('Failed to generate unique code after 100 attempts');
      }
    } while (await prisma.verificationCode.findUnique({ where: { code } }));

    // Create verification code
    const expiresAt = getDefaultExpiration();
    const verificationCode = await prisma.verificationCode.create({
      data: {
        code,
        creatorFid: fid,
        expiresAt,
      },
    });

    // Return JSON for API calls, or Frame response for Frame calls
    const isFrameRequest = body.trustedData?.messageBytes;
    
    if (isFrameRequest) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Share Code',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/verification-code/${verificationCode.id}`,
            },
            {
              label: 'Back',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/verification-code?code=${code}`,
            aspectRatio: '1.91:1',
          },
        }),
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        code: verificationCode.code,
        codeId: verificationCode.id,
        expiresAt: verificationCode.expiresAt.toISOString(),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating verification code:', error);
    return new Response(
      JSON.stringify({ error: 'Error generating verification code', details: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

