import mongoose from 'mongoose';

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

export const connectDB = () =>
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((error) => {
      console.error(`MongoDB connection error`, error);
    });
