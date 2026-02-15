import Asset from '../models/Asset';
import { IAsset } from '../types/asset.types';

export class AssetRepository {
  async findAllAssetsByUserId(userId: string): Promise<IAsset[]> {
    return await Asset.find({ user: userId }).exec();
  }

  async findAssetById(id: string): Promise<IAsset | null> {
    return await Asset.findById(id);
  }

  async createAsset(asset: IAsset): Promise<IAsset> {
    const newAsset = new Asset(asset);
    return await newAsset.save();
  }

  async updateAsset(id: string, asset: Partial<IAsset>): Promise<IAsset> {
    return (await Asset.findOneAndUpdate({ _id: id }, asset, {
      returnDocument: 'after',
    })) as IAsset;
  }

  async deleteAsset(id: string): Promise<IAsset | null> {
    return await Asset.findByIdAndDelete(id);
  }
}
