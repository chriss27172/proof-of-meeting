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
    
    // Try to get frame data
    let fid: number | null = null;
    try {
      const frameData = await getFrameMessage(body);
      if (frameData?.isValid && frameData.message) {
        fid = frameData.message.fid;
      }
    } catch {
      // Not a frame request
    }

    if (!fid) {
      return new Response(
        JSON.stringify({ 
          error: 'Please use the Frame interface in Farcaster or BaseApp. Your FID is automatically detected.',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ fid }),
      {
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

