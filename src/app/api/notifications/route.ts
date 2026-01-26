import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  // 1. Verify API Key
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.NOTIFICATIONS_API_KEY;

  if (!validApiKey || apiKey !== validApiKey) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing API Key' },
      { status: 401 }
    );
  }

  try {
    // 2. Parse Body
    const body = await request.json();
    const { user_email, title, message, link } = body;

    // Validate required fields
    if (!user_email || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: user_email and title are required' },
        { status: 400 }
      );
    }

    // 3. Insert into Supabase
    const { data, error } = await supabase
      .from('notifications')
      .insert([
        {
          user_email,
          title,
          message,
          link,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[API] Error creating notification:', error);
      return NextResponse.json(
        { error: 'Failed to create notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, notification: data });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
