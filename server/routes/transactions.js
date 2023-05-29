import express from 'express';
export const transactionsRouter = express.Router();
import { auth } from '../services/controllers/authOperations.js';
import { add, edit, getById, remove } from '../services/controllers/transactionsOperations.js';

transactionsRouter.get('/', auth);

transactionsRouter.get('/:transactionId', auth, getById);

transactionsRouter.post('/', auth, add);

transactionsRouter.patch('/:transactionId', auth, edit);

transactionsRouter.delete('/:transactionId', auth, remove);
