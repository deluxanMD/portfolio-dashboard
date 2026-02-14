import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/repository/user.repository';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Create new user
  async register(username: string, password: string): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new Error('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await this.userRepository.createUser(username, passwordHash);

    return { message: 'User created successfully' };
  }

  // Login user
  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return { token, username: user.username };
  }
}
