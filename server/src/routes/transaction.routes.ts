import express from 'express';
import { addTransaction, getTransactionHistory } from '../controllers/transaction.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', auth, getTransactionHistory);
router.post('/', auth, addTransaction);

export default router;
