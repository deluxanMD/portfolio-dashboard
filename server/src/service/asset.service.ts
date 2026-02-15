import { AssetRepository } from '../repository/asset.repository';
import { IAsset } from '../types/asset.types';
import { ErrorCode, ErrorMessage, ServiceResponse } from '../types/common.types';

export class AssetService {
  private assetRepository: AssetRepository;

  constructor() {
    this.assetRepository = new AssetRepository();
  }

  async getPortfolio(userId: string): Promise<ServiceResponse<IAsset[]>> {
    const assets = await this.assetRepository.findAllAssetsByUserId(userId);
    return { success: true, data: assets };
  }

  async getPortfolioById(assetId: string): Promise<ServiceResponse<IAsset>> {
    const asset = await this.assetRepository.findAssetById(assetId);
    if (!asset) {
      return {
        success: false,
        error: {
          code: ErrorCode.NOT_FOUND,
          message: ErrorMessage.ASSET_NOT_FOUND,
        },
      };
    }
    return { success: true, data: asset };
  }

  async addAsset(userId: string, asset: IAsset): Promise<ServiceResponse<IAsset>> {
    const newAsset = await this.assetRepository.createAsset({
      ...asset,
      user: userId,
    } as unknown as IAsset);

    return { success: true, data: newAsset };
  }

  async updateAsset(
    userId: string,
    assetId: string,
    updatedData: Partial<IAsset>
  ): Promise<ServiceResponse<IAsset>> {
    const existingAsset = await this.assetRepository.findAssetById(assetId);

    if (!existingAsset) {
      return {
        success: false,
        error: {
          code: ErrorCode.NOT_FOUND,
          message: ErrorMessage.ASSET_NOT_FOUND,
        },
      };
    }

    if (existingAsset.user.toString() !== userId) {
      return {
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: ErrorMessage.INVALID_CREDENTIALS,
        },
      };
    }

    const updatedAsset = await this.assetRepository.updateAsset(assetId, updatedData);

    return { success: true, data: updatedAsset as IAsset };
  }

  async deleteAsset(
    userId: string,
    assetId: string
  ): Promise<ServiceResponse<{ message: string }>> {
    const existingAsset = await this.assetRepository.findAssetById(assetId);

    if (!existingAsset) {
      return {
        success: false,
        error: {
          code: ErrorCode.NOT_FOUND,
          message: ErrorMessage.ASSET_NOT_FOUND,
        },
      };
    }

    if (existingAsset.user.toString() !== userId) {
      return {
        success: false,
        error: {
          code: ErrorCode.BAD_REQUEST,
          message: ErrorMessage.INVALID_CREDENTIALS,
        },
      };
    }

    await this.assetRepository.deleteAsset(assetId);

    return { success: true, data: { message: 'Asset deleted successfully' } };
  }
}
