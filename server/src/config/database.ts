import mongoose from 'mongoose';
import logger from '../utils/logger.util';

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

export const connectDB = () =>
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error(`MongoDB connection error: ${error}`);
    });
