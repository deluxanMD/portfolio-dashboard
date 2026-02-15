import mongoose, { Document } from 'mongoose';

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  asset: mongoose.Types.ObjectId;
  type: TransactionType;
  quantity: number;
  pricePerUnit: number;
  date: Date;
}
