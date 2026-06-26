# AI Website Builder — Server

REST API and authentication backend for the AI Website Builder SaaS app. Handles AI code generation via OpenAI, user sessions, project storage, version history, and transactions.

## ✨ Features
- AI website generation pipeline using OpenAI API
- Project & version history storage
- User authentication with session management
- Database schema migrations with Prisma ORM
- Transaction & credits tracking

## 🛠️ Tech Stack
- Node.js, TypeScript, Express v5
- Prisma ORM + PostgreSQL
- OpenAI SDK
- Better Auth

## ⚙️ Getting Started

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
OPENAI_API_KEY="your-openai-api-key"
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:5000"
PORT=5000
```

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```
