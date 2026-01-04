import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Webhook endpoint for Farcaster/BaseApp miniapp notifications
 * This endpoint receives events from Farcaster/BaseApp when users interact with the miniapp
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log webhook events for debugging
    console.log('Webhook received:', JSON.stringify(body, null, 2));
    
    // Handle different webhook event types
    // You can extend this to handle specific events like:
    // - User opened miniapp
    // - User closed miniapp
    // - User performed action
    // etc.
    
    return NextResponse.json(
      { success: true, message: 'Webhook received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
}

// Also support GET for webhook verification
export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: 'Webhook endpoint is active' },
    { status: 200 }
  );
}


