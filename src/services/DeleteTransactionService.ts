import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    try {
      const transaction = await transactionRepository.findOne(id);

      if (transaction) {
        transactionRepository.remove(transaction);
      }
    } catch (err) {
      throw new AppError('Transaction not found.', 400);
    }
  }
}

export default DeleteTransactionService;
