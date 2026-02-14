import User from '@/models/User';
import { IUser } from '@/types/user.types';

export class UserRepository {
  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async createUser(username: string, passwordHash: string): Promise<IUser> {
    const user = new User({ username, passwordHash });
    return user.save();
  }
}
