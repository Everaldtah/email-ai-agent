import { NextRequest, NextResponse } from 'next/server';
import { analyzeEmail } from '@/lib/email-analyzer';

export async function POST(request: NextRequest) {
  try {
    const { subject, body } = await request.json();
    
    if (!subject || !body) {
      return NextResponse.json({ error: 'Subject and body required' }, { status: 400 });
    }

    const analysis = await analyzeEmail(subject, body);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
