import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user.types';

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual methods
UserSchema.virtual('password')
  .set(function (value: string) {
    this._password = value; // temporary variable
    const salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(value, salt);
  })
  .get(function () {
    return this._password;
  });

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
