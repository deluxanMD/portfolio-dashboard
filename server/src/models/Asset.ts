import mongoose, { Schema } from 'mongoose';
import { IAsset } from '../types/asset.types';

const AssetSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    type: {
      type: String,
      enum: ['Stock', 'Bond', 'Mutual Fund', 'ETF', 'Real Estate'],
      default: 'Stock',
      required: true,
    },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    currentPrice: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IAsset>('Asset', AssetSchema);
