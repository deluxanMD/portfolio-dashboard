import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { ErrorCode, ErrorMessage, ServiceResponse } from '../types/common.types';
import logger from '../utils/logger.util';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Helper to generate tokens
  private generateTokens(userId: string, username: string) {
    const token = jwt.sign({ userId, username }, process.env.JWT_SECRET as string, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
      { userId, username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    return { token, refreshToken };
  }

  // Create new user
  async register(
    username: string,
    password: string
  ): Promise<ServiceResponse<{ message: string }>> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      return {
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: ErrorMessage.USER_EXIST,
        },
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await this.userRepository.createUser(username, passwordHash);

    return {
      success: true,
      data: { message: 'User created successfully' },
    };
  }

  // Login user
  async login(
    username: string,
    password: string
  ): Promise<ServiceResponse<{ token: string; refreshToken: string; username: string }>> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return {
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: ErrorMessage.INVALID_CREDENTIALS,
        },
      };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return {
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: ErrorMessage.INVALID_CREDENTIALS,
        },
      };
    }

    const { token, refreshToken } = this.generateTokens(user._id.toString(), user.username);

    return {
      success: true,
      data: { token, refreshToken, username: user.username },
    };
  }

  // Token management
  async refreshToken(refreshToken: string): Promise<ServiceResponse<{ token: string }>> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as {
        userId: string;
        username: string;
      };

      // Issue a new Access Token only
      const newAccessToken = jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
      );

      return {
        success: true,
        data: { token: newAccessToken },
      };
    } catch (error) {
      logger.error('Error refreshing token:', error);
      return {
        success: false,
        error: { code: ErrorCode.UNAUTHORIZED, message: ErrorMessage.UNAUTHORIZED },
      };
    }
  }
}
