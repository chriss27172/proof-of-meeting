import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { prisma } from '@/lib/prisma';
import { validateCodeFormat, isCodeExpired } from '@/lib/verificationCode';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code: inputCode } = body;
    
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
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please use the Frame interface.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate code format
    if (!inputCode || !validateCodeFormat(inputCode)) {
      const errorMsg = 'Invalid code format. Code must be exactly 5 digits.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find verification code
    const verificationCode = await prisma.verificationCode.findUnique({
      where: { code: inputCode },
      include: {
        creator: true,
      },
    });

    if (!verificationCode) {
      const errorMsg = 'Invalid code. Code not found.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code is expired
    if (isCodeExpired(verificationCode.expiresAt)) {
      const errorMsg = 'Code expired. Please ask for a new code.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code is already used
    if (verificationCode.used) {
      const errorMsg = 'Code already used. Please ask for a new code.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prevent self-verification
    if (verificationCode.creatorFid === fid) {
      const errorMsg = 'Cannot verify yourself. Share your code with someone else.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get verifier user
    const verifier = await prisma.user.findUnique({
      where: { fid },
    });

    if (!verifier) {
      const errorMsg = 'User not found. Please create a profile first.';
      const isFrameRequest = body.trustedData?.messageBytes;
      
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [{ label: 'Back' }],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=${encodeURIComponent(errorMsg)}`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if mutual meetings already exist (within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingMutualMeeting = await prisma.meeting.findFirst({
      where: {
        OR: [
          {
            initiatorFid: verificationCode.creatorFid,
            participantFid: fid,
          },
          {
            initiatorFid: fid,
            participantFid: verificationCode.creatorFid,
          },
        ],
        createdAt: { gte: oneHourAgo },
        status: { in: ['confirmed', 'completed'] },
      },
    });

    if (existingMutualMeeting) {
      // Mark code as used anyway
      await prisma.verificationCode.update({
        where: { id: verificationCode.id },
        data: {
          used: true,
          usedByFid: fid,
          usedAt: new Date(),
          meetingId: existingMutualMeeting.id,
        },
      });

      const isFrameRequest = body.trustedData?.messageBytes;
      if (isFrameRequest) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [
              {
                label: 'View Meeting',
                action: 'link',
                target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${existingMutualMeeting.id}`,
              },
              { label: 'Back' },
            ],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Mutual+meeting+already+exists`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }

      return new Response(
        JSON.stringify({
          meetingId: existingMutualMeeting.id,
          mutualMeetingId: existingMutualMeeting.id,
          success: true,
          message: 'Mutual meeting already exists.',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create TWO mutual meetings automatically - both confirmed!
    const meeting1 = await prisma.meeting.create({
      data: {
        initiatorFid: fid, // Person who entered the code
        participantFid: verificationCode.creatorFid, // Person who created the code
        status: 'confirmed',
        verificationMethod: 'code',
        confirmedAt: new Date(),
        verificationCodeId: verificationCode.id,
      },
    });

    const meeting2 = await prisma.meeting.create({
      data: {
        initiatorFid: verificationCode.creatorFid, // Person who created the code
        participantFid: fid, // Person who entered the code
        status: 'confirmed',
        verificationMethod: 'code',
        confirmedAt: new Date(),
      },
    });

    // Mark code as used
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: {
        used: true,
        usedByFid: fid,
        usedAt: new Date(),
        meetingId: meeting1.id, // Link to first meeting
      },
    });

    // Update reputation scores
    const { updateReputationAfterMeeting } = await import('@/lib/reputation');
    await updateReputationAfterMeeting(verificationCode.creator.id);
    await updateReputationAfterMeeting(verifier.id);

    const isFrameRequest = body.trustedData?.messageBytes;
    if (isFrameRequest) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View Meeting',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting1.id}`,
            },
            {
              label: 'Mint Attestation',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting1.id}/mint`,
            },
            { label: 'Back' },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/meeting?meetingId=${meeting1.id}&mutual=true`,
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
        meetingId: meeting1.id,
        mutualMeetingId: meeting2.id,
        success: true,
        message: 'Mutual verification completed! Both meetings are confirmed.',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error verifying code:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing request', details: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

