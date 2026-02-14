import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../types/transaction.types';

const TransactionSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
    type: { type: String, enum: ['BUY', 'SELL'], required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
