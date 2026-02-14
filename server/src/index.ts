import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load env files based on the current environment
const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: `Portfolio management API is running in ${environment} mode`,
  });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);

    app.listen((PORT) => () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB connection error`, error);
  });
