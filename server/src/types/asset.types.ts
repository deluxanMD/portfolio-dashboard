import mongoose, { Document } from 'mongoose';

export type AssetType = 'Stock' | 'Bond' | 'Mutual Fund' | 'ETF' | 'Real Estate';

export interface IAsset extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  symbol: string;
  type: AssetType;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}
