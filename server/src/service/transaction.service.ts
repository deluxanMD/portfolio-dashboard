import { Types } from 'mongoose';
import { AssetRepository } from '../repository/asset.repository';
import { TransactionRepository } from '../repository/transaction.repository';
import { ErrorCode, ErrorMessage, ServiceResponse } from '../types/common.types';
import { ITransaction, TransactionType } from '../types/transaction.types';

export class TransactionService {
  private transactionRepository: TransactionRepository;
  private assetRepository: AssetRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.assetRepository = new AssetRepository();
  }

  async getHistory(userId: string): Promise<ServiceResponse<ITransaction[]>> {
    const history = await this.transactionRepository.findAllByUserId(userId);
    return { success: true, data: history };
  }

  async addTransaction(
    userId: string,
    assetId: string,
    type: TransactionType,
    quantity: number,
    pricePerUnit: number
  ): Promise<ServiceResponse<ITransaction>> {
    const asset = await this.assetRepository.findAssetById(assetId);

    // Validate Asset Exist
    if (!asset) {
      return {
        success: false,
        error: { code: ErrorCode.NOT_FOUND, message: ErrorMessage.ASSET_NOT_FOUND },
      };
    }

    // Validate User
    if (asset.user.toString() !== userId) {
      return {
        success: false,
        error: { code: ErrorCode.FORBIDDEN, message: ErrorMessage.UNAUTHORIZED_ASSET },
      };
    }

    // Calculating New Quantity
    let newQuantity = asset.quantity;
    if (type === TransactionType.BUY) {
      newQuantity += quantity;
    } else {
      if (asset.quantity < quantity) {
        return {
          success: false,
          error: { code: ErrorCode.BAD_REQUEST, message: ErrorMessage.INSUFFICIENT_QTY },
        };
      }
      newQuantity -= quantity;
    }

    // Update Asset
    await this.assetRepository.updateAsset(assetId, { quantity: newQuantity });

    // Create Transaction
    const transaction = await this.transactionRepository.create({
      user: new Types.ObjectId(userId),
      asset: new Types.ObjectId(assetId),
      type,
      quantity,
      pricePerUnit,
      date: new Date(),
    });

    return { success: true, data: transaction };
  }
}
