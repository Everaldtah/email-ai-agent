import { NextRequest, NextResponse } from 'next/server';
import { draftReply } from '@/lib/email-analyzer';

export async function POST(request: NextRequest) {
  try {
    const { context, tone } = await request.json();
    
    const reply = await draftReply(context, tone || 'professional');
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Draft generation failed' }, { status: 500 });
  }
}
