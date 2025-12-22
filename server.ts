import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';

const app = express();

const port = process.env.PORT || 3000;

// 1. إعداد الروابط الموثوقة وتنظيفها
const trustedOrigins = process.env.TRUSTED_ORIGIN?.split(',').map(o => o.trim()) || [];

// 2. معالج CORS يدوي لضمان أقصى درجات التوافق مع Better Auth و Express 5
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && trustedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-better-auth-antiforgery');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // معالجة طلبات Preflight (OPTIONS) بشكل فوري
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// 3. موديول CORS القياسي كدعم إضافي
app.use(cors({
  origin: trustedOrigins,
  credentials: true
}));

// 4. معالج Better Auth باستخدام Regex لضمان التوافق مع Express 5 وعدم انهيار السيرفر
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