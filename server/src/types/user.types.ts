import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  password?: string; // virtual field
  _password?: string; // temporary variable
  comparePassword(password: string): Promise<boolean>;
}

export interface UserInput {
  username: string;
  password: string;
}
