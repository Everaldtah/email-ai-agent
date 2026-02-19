# Email AI Agent 📧🤖

An AI-powered email assistant that automatically drafts replies, categorizes messages, and prioritizes your inbox.

## Features

- ✉️ **Smart Reply Drafts** - AI generates contextual response suggestions
- 🏷️ **Auto-Categorization** - Classifies emails by type (urgent, newsletter, spam, follow-up)
- ⭐ **Priority Scoring** - Ranks emails by importance
- 📊 **Dashboard Analytics** - Track email patterns and response times
- 🔌 **Gmail/Outlook Integration** - Connect your existing email

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, TypeScript
- **Backend:** Express.js, Node.js
- **AI:** OpenAI GPT-4 / Anthropic Claude
- **Database:** PostgreSQL + Prisma
- **Auth:** Clerk / NextAuth

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Everaldtah/email-ai-agent.git
cd email-ai-agent

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your OPENAI_API_KEY

# Run development server
npm run dev
```

## Environment Variables

```env
OPENAI_API_KEY=your-key-here
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/email/analyze` | POST | Analyze email content |
| `/api/email/draft-reply` | POST | Generate reply suggestion |
| `/api/email/categorize` | POST | Classify email type |
| `/api/email/priority` | POST | Calculate priority score |

## Roadmap

- [ ] Multi-language support
- [ ] Calendar integration
- [ ] Team collaboration
- [ ] Mobile app
- [ ] Custom AI training

## License

MIT

---

Built with ❤️ by [Everald](https://github.com/Everaldtah)
