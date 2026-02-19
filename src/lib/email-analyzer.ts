import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface EmailAnalysis {
  category: 'urgent' | 'newsletter' | 'follow-up' | 'spam' | 'general';
  priority: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
  suggestedReply: string;
}

export async function analyzeEmail(subject: string, body: string): Promise<EmailAnalysis> {
  const prompt = `Analyze this email and respond in JSON format:

Subject: ${subject}
Body: ${body}

Respond with ONLY valid JSON:
{
  "category": "urgent|newsletter|follow-up|spam|general",
  "priority": 1-10,
  "sentiment": "positive|neutral|negative",
  "summary": "one sentence summary",
  "suggestedReply": "brief professional reply"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 500,
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function draftReply(emailContext: string, tone: 'professional' | 'friendly' | 'formal' = 'professional'): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: `You are an email assistant. Draft a ${tone} reply.` },
      { role: 'user', content: emailContext },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0].message.content || '';
}
