import express from 'express';
import { auth } from '../middlewares/auth.middleware';
import {
  getPortfolio,
  getPortfolioById,
  addAsset,
  updateAsset,
  deleteAsset,
} from '../controllers/asset.controller';

const router = express.Router();

router.get('/', auth, getPortfolio);
router.get('/:id', auth, getPortfolioById);
router.post('/', auth, addAsset);
router.put('/:id', auth, updateAsset);
router.delete('/:id', auth, deleteAsset);

export default router;
