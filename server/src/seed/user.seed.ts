import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import User from '../models/User';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const seed = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    const testUsername = 'testuser';
    const testPassword = 'password123';

    const existingUser = await User.findOne({ username: testUsername });

    if (existingUser) {
      console.log('Test user already exists.');
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(testPassword, salt);

      await User.create({
        username: testUsername,
        passwordHash,
      });

      console.log('Test user created successfully!');
    }
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seed();
