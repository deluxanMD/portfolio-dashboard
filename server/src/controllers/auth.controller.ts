import { Request, Response } from 'express';
import { AuthService } from '@/service/auth.service';
import { UserInput } from '@/types/user.types';
import logger from '@/utils/logger.util';
import { ErrorCode, ErrorMessage } from '@/types/common.types';

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

    if (!result.success) {
      const code = result.error?.code;

      switch (code) {
        case ErrorCode.USER_EXIST:
          res.status(400).json({ message: ErrorMessage.USER_EXIST });
          break;
        default:
          res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
          break;
      }

      return;
    }

    res.status(201).json(result);
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

    if (!result.success) {
      const code = result.error?.code;

      switch (code) {
        case ErrorCode.INVALID_CREDENTIALS:
          res.status(400).json({ message: ErrorMessage.INVALID_CREDENTIALS });
          break;
        default:
          res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
          break;
      }

      return;
    }

    res.status(200).json(result);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
  }
};
