import { Response } from 'express';
import { AssetService } from '../service/asset.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ErrorCode, ErrorMessage } from '../types/common.types';
import logger from '../utils/logger.util';

const assetService = new AssetService();

export const getPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: ErrorCode.UNAUTHORIZED,
          message: ErrorMessage.UNAUTHORIZED,
        },
      });
      return;
    }

    const result = await assetService.getPortfolio(userId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: ErrorCode.SERVER_ERROR,
        message: ErrorMessage.SERVER_ERROR,
      },
    });
  }
};

export const addAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: ErrorCode.UNAUTHORIZED,
          message: ErrorMessage.UNAUTHORIZED,
        },
      });
      return;
    }

    const assetData = req.body;
    const result = await assetService.addAsset(userId, assetData);
    res.status(201).json(result);
  } catch (error) {
    logger.error('Add asset error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: ErrorCode.SERVER_ERROR,
        message: ErrorMessage.SERVER_ERROR,
      },
    });
  }
};

export const updateAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: ErrorCode.UNAUTHORIZED,
          message: ErrorMessage.UNAUTHORIZED,
        },
      });
      return;
    }

    const assetId = req.params.id;
    const updatedData = req.body;
    const result = await assetService.updateAsset(userId, assetId as string, updatedData);

    if (!result.success) {
      res.status(result.error?.code || 400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    logger.error('Update asset error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: ErrorCode.SERVER_ERROR,
        message: ErrorMessage.SERVER_ERROR,
      },
    });
  }
};

export const deleteAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: ErrorCode.UNAUTHORIZED,
          message: ErrorMessage.UNAUTHORIZED,
        },
      });
      return;
    }

    const assetId = req.params.id;
    const result = await assetService.deleteAsset(userId, assetId as string);

    if (!result.success) {
      res.status(result.error?.code || 400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    logger.error('Delete asset error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: ErrorCode.SERVER_ERROR,
        message: ErrorMessage.SERVER_ERROR,
      },
    });
  }
};
