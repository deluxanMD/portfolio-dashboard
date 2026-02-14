import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';

import { connectDB } from './config/database';

// utils
import logger from './utils/logger.util';

// Routes
import authRoutes from './routes/auth.routes';
import { SystemError } from './types/error.types';

// Load env files based on the current environment
const PORT = process.env.PORT || 5001;
const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

connectDB();

logger.info(`Loaded environment: ${environment} from ${envFile}`);

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Morgan Middleware
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logMessage = message.trim();
        const parts = logMessage.split(' ');
        const status = parseInt(parts[2]);

        if (!isNaN(status) && status >= 400) {
          logger.error(logMessage);
        } else {
          logger.info(logMessage);
        }
      },
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: `Portfolio management API is running in ${environment} mode`,
  });
});

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

server.on('error', (e: SystemError) => {
  if (e.code === 'EADDRINUSE') {
    logger.error(`Error: Port ${PORT} is already in use!`);
  } else {
    logger.error(`Server failed to start: ${e}`);
  }
});
