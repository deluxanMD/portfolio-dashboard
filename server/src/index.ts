import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Routes
import authRoutes from '@/routes/auth.routes';
import { connectDB } from './config/database';

// Load env files based on the current environment
const PORT = process.env.PORT || 5001;
const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });
connectDB();

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: `Portfolio management API is running in ${environment} mode`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
