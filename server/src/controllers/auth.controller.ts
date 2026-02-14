import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import logger from '../utils/logger.util';
import { ErrorCode, ErrorMessage } from '../types/common.types';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(ErrorCode.BAD_REQUEST).json({
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: 'Username and password are required',
        },
      });
      return;
    }

    const result = await authService.register(username, password);
    console.log('controller result', result);
    const code = result.error?.code;
    res.status(Number(code)).json(result);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(ErrorCode.BAD_REQUEST).json({
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: 'Username and password are required',
        },
      });
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
