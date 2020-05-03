import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();

  const statement = {
    transactions,
    balance: await transactionsRepository.getBalance(),
  };

  return response.json(statement);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute(id);
    return response.status(200).send();
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
