import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthService } from '../../service/auth.service';
import { UserRepository } from '../../repository/user.repository';

// Mock dependencies
jest.mock('../../repository/user.repository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();

    mockUserRepository = (UserRepository as jest.Mock).mock
      .instances[0] as jest.Mocked<UserRepository>;
  });

  describe('register', () => {
    it('should return error if user already exists', async () => {
      const username = 'testuser';
      const password = 'password1234';

      mockUserRepository.findByUsername.mockResolvedValue({ _id: '1', username } as any);

      const result = await authService.register(username, password);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe(400);
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it('should create user if username is available', async () => {
      const username = 'newuser';
      const password = 'password123';
      const hashedPassword = 'hashed_password';

      mockUserRepository.findByUsername.mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await authService.register(username, password);

      expect(result.success).toBe(true);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(username, hashedPassword);
    });
  });

  describe('login', () => {
    it('should return error if user does not exist', async () => {
      mockUserRepository.findByUsername.mockResolvedValue(null);

      const result = await authService.login('wronguser', 'password');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe(400);
    });

    it('should return error if password does not match', async () => {
      const user = { _id: '1', username: 'test', passwordHash: 'hash' };
      // @ts-ignore
      mockUserRepository.findByUsername.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.login('test', 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe(400);
    });

    it('should return token if credentials are correct', async () => {
      const user = { _id: '1', username: 'test', passwordHash: 'hash' };
      const token = 'fake_jwt_token';

      // @ts-ignore
      mockUserRepository.findByUsername.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await authService.login('test', 'password');

      expect(result.success).toBe(true);
      expect(result.data?.token).toBe(token);
      expect(result.data?.username).toBe('test');
    });
  });
});
