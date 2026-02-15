import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { TransactionService } from '../service/transaction.service';
import { ErrorCode, ErrorMessage } from '../types/common.types';
import logger from '../utils/logger.util';

const transactionService = new TransactionService();

export const getTransactionHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: { code: ErrorCode.UNAUTHORIZED, message: ErrorMessage.UNAUTHORIZED },
      });
      return;
    }

    const result = await transactionService.getHistory(userId);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Get History Error: ${error}`);
    res.status(500).json({
      success: false,
      error: { code: ErrorCode.SERVER_ERROR, message: ErrorMessage.SERVER_ERROR },
    });
  }
};

export const addTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: { code: ErrorCode.UNAUTHORIZED, message: ErrorMessage.UNAUTHORIZED },
      });
      return;
    }

    const { assetId, type, quantity, pricePerUnit } = req.body || {};

    console.log({ assetId, type, quantity, pricePerUnit });

    if (!assetId || !type || !quantity || !pricePerUnit) {
      res.status(400).json({
        success: false,
        error: { code: ErrorCode.BAD_REQUEST, message: ErrorMessage.REQUIRED_FIELDS },
      });
      return;
    }

    const result = await transactionService.addTransaction(
      userId,
      assetId,
      type,
      Number(quantity),
      Number(pricePerUnit)
    );

    if (!result.success) {
      res.status(ErrorCode.SERVER_ERROR).json(result);
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    logger.error(`Add Transaction Error: ${error}`);
    res.status(500).json({
      success: false,
      error: { code: ErrorCode.SERVER_ERROR, message: ErrorMessage.SERVER_ERROR },
    });
  }
};
