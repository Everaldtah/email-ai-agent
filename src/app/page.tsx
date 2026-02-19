'use client';

import { useState } from 'react';
import { Mail, Sparkles, Send, Loader2 } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState({ subject: '', body: '' });
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [replyDraft, setReplyDraft] = useState('');

  const analyzeEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/email/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const generateReply = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/email/draft-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: `Subject: ${email.subject}\n\n${email.body}` }),
      });
      const data = await res.json();
      setReplyDraft(data.reply);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Email AI Agent</h1>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-slate-400">AI-powered email assistant • Drafts • Categorizes • Prioritizes</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Paste Your Email</h2>
          
          <input
            type="text"
            placeholder="Email Subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white mb-4 focus:outline-none focus:border-purple-500"
          />
          
          <textarea
            placeholder="Email Body..."
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white h-40 mb-4 focus:outline-none focus:border-purple-500"
          />
          
          <div className="flex gap-4">
            <button
              onClick={analyzeEmail}
              disabled={loading || !email.subject || !email.body}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Analyze Email
            </button>
            
            <button
              onClick={generateReply}
              disabled={loading || !email.body}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
            >
              <Send className="w-5 h-5" />
              Draft Reply
            </button>
          </div>
        </div>

        {analysis && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Analysis Results</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm">Category</p>
                <p className="text-white font-semibold capitalize">{analysis.category}</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm">Priority</p>
                <p className="text-white font-semibold">{analysis.priority}/10</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm">Sentiment</p>
                <p className="text-white font-semibold capitalize">{analysis.sentiment}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-slate-400 text-sm mb-2">Summary</p>
              <p className="text-white">{analysis.summary}</p>
            </div>
            
            {analysis.suggestedReply && (
              <div>
                <p className="text-slate-400 text-sm mb-2">Suggested Reply</p>
                <p className="text-slate-300 bg-slate-900/50 p-4 rounded-xl">{analysis.suggestedReply}</p>
              </div>
            )}
          </div>
        )}

        {replyDraft && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/50">
            <h2 className="text-xl font-semibold text-white mb-4">Drafted Reply</h2>
            <p className="text-slate-300 whitespace-pre-wrap">{replyDraft}</p>
          </div>
        )}
      </div>
    </main>
  );
}
