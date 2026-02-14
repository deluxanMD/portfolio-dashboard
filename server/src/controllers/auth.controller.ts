import { Request, Response } from 'express';
import { AuthService } from '@/service/auth.service';
import { UserInput } from '@/types/user.types';
import { Error } from 'mongoose';

const authService = new AuthService();

export const register = async (
  req: Request<void, void, UserInput>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const result = await authService.register(username, password);
    res.status(201).json(result);
  } catch (error: unknown) {
    let status = 500;
    let message = 'Server Error';

    if (error instanceof Error) {
      message = error.message;

      if (message === 'User already exists') {
        status = 400;
      }
    }

    res.status(status).json({ message });
  }
};

export const login = async (req: Request<void, void, UserInput>, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    let status = 500;
    let message = 'Server error';

    if (error instanceof Error) {
      message = error.message;
      if (message === 'Invalid credentials') status = 401;
    }

    res.status(status).json({ message });
  }
};
