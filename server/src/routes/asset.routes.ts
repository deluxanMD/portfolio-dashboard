import express from 'express';
import { auth } from '../middlewares/auth.middleware';
import { getPortfolio, addAsset, updateAsset, deleteAsset } from '../controllers/asset.controller';

const router = express.Router();

router.get('/', auth, getPortfolio);
router.post('/', auth, addAsset);
router.put('/:id', auth, updateAsset);
router.delete('/:id', auth, deleteAsset);

export default router;
