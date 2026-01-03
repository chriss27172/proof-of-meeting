import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { prisma } from '@/lib/prisma';
import { parseQRCodeData, validateQRCode } from '@/lib/qrCode';
import { parseNFCTagData, validateNFCTag } from '@/lib/nfc';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data: inputData, method: verificationMethodRaw } = body;
    
    // Try to get frame data if available
    let fid: number | null = null;
    try {
      const frameData = await getFrameMessage(body);
      if (frameData?.isValid && frameData.message) {
        fid = frameData.message.fid;
      }
    } catch {
      // Not a frame request, continue with regular API
    }

    if (!fid) {
      // For non-frame requests, we need FID from session/auth
      // For now, return error - in production, use proper auth
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please use the Frame interface.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const verificationMethod = verificationMethodRaw || (inputData?.includes('nfc') ? 'nfc' : 'qr');

    // Parse verification data (QR or NFC)
    let parsedData;
    if (verificationMethod === 'nfc') {
      parsedData = parseNFCTagData(inputData);
      if (!parsedData || !validateNFCTag(parsedData)) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [
              { label: 'Invalid NFC Tag' },
              { label: 'Back' },
            ],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Invalid+NFC+tag`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
    } else {
      parsedData = parseQRCodeData(inputData);
      if (!parsedData || !validateQRCode(parsedData)) {
        return new Response(
          getFrameHtmlResponse({
            buttons: [
              { label: 'Invalid QR Code' },
              { label: 'Back' },
            ],
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Invalid+QR+code`,
              aspectRatio: '1.91:1',
            },
          }),
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
    }

    // Check if users exist
    const initiator = await prisma.user.findUnique({ where: { fid } });
    const participant = await prisma.user.findUnique({ 
      where: { fid: parsedData.fid } 
    });

    if (!initiator || !participant) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [{ label: 'Back' }],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=User+not+found`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // Prevent self-meeting
    if (initiator.fid === participant.fid) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [{ label: 'Back' }],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Cannot+meet+yourself`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // Check if mutual meetings already exist (within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingMeeting = await prisma.meeting.findFirst({
      where: {
        OR: [
          {
            initiatorFid: initiator.fid,
            participantFid: participant.fid,
          },
          {
            initiatorFid: participant.fid,
            participantFid: initiator.fid,
          },
        ],
        createdAt: { gte: oneHourAgo },
      },
    });

    if (existingMeeting) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View Meeting',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${existingMeeting.id}`,
            },
            { label: 'Back' },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/error?msg=Meeting+already+exists`,
            aspectRatio: '1.91:1',
          },
        }),
      );
    }

    // Create TWO mutual meetings automatically - both confirmed!
    // Meeting 1: Initiator -> Participant (person who scanned)
    // Meeting 2: Participant -> Initiator (person whose QR was scanned)
    const [meeting1, meeting2] = await prisma.$transaction([
      prisma.meeting.create({
        data: {
          initiatorFid: initiator.fid, // Person who scanned
          participantFid: participant.fid, // Person whose QR was scanned
          status: 'confirmed', // Automatically confirmed for mutual verification
          verificationMethod,
          confirmedAt: new Date(),
        },
      }),
      prisma.meeting.create({
        data: {
          initiatorFid: participant.fid, // Person whose QR was scanned
          participantFid: initiator.fid, // Person who scanned
          status: 'confirmed', // Automatically confirmed for mutual verification
          verificationMethod,
          confirmedAt: new Date(),
        },
      }),
    ]);

    // Use the first meeting as primary (for backward compatibility)
    const meeting = meeting1;

    // Return JSON for API calls, or Frame response for Frame calls
    const isFrameRequest = body.trustedData?.messageBytes;
    
    if (isFrameRequest) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'View My Meeting',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`,
            },
            {
              label: 'Mint Attestation',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}/mint`,
            },
            { label: 'Back' },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/meeting?meetingId=${meeting.id}&mutual=true`,
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
        meetingId: meeting.id,
        mutualMeetingId: meeting2.id,
        success: true,
        message: 'Mutual verification completed! Both meetings are confirmed.',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error confirming meeting:', error);
    return new Response('Error processing request', { status: 500 });
  }
}

