import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.TRUSTED_ORIGIN?.split(',').map(o => o.trim().replace(/\/$/, '')) || [],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-better-auth-antiforgery"],
  credentials: true,
}

app.use(cors(corsOptions))

app.all(/\/api\/auth\/.*/, (req, res) => {
  return toNodeHandler(auth)(req, res);
});

app.use(express.json({ limit: '50mb' }))

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Live!');
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});