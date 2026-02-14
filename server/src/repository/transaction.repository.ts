import Transaction from '../models/Transaction';
import { ITransaction } from '../types/transaction.types';

export class TransactionRepository {
  async create(transactionData: Partial<ITransaction>): Promise<ITransaction> {
    const transaction = new Transaction(transactionData);
    return transaction.save();
  }

  async findAllByUserId(userId: string): Promise<ITransaction[]> {
    return Transaction.find({ user: userId })
      .populate('asset', 'name symbol type')
      .sort({ date: -1 });
  }
}
