import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/repository/user.repository';
import { ErrorCode, ErrorMessage, ServiceResponse } from '@/types/common.types';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
  ): Promise<ServiceResponse<{ token: string; username: string }>> {
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

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return {
      success: true,
      data: { token, username: user.username },
    };
  }
}
