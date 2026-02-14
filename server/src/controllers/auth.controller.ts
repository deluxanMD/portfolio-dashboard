import { Request, Response } from 'express';
import { AuthService } from '@/service/auth.service';
import { UserInput } from '@/types/user.types';
import logger from '@/utils/logger.util';
import { ErrorMessage } from '@/types/common.types';

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
    const code = result.error?.code;
    res.status(Number(code)).json(result);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
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
    const code = result.error?.code;
    res.status(Number(code)).json(result);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
  }
};
