import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const validateID = validate(id);

    if (!validateID) {
      throw new AppError('Transaction does not exist.');
    }

    const transaction = await transactionsRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError('Transaction does not exist!');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
