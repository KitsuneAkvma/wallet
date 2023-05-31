import express from 'express';
export const transactionsRouter = express.Router();
import { auth } from '../services/controllers/authOperations.js';
import { add, edit, getById, remove, get } from '../services/controllers/transactionsOperations.js';

transactionsRouter.get('/', auth, get);

transactionsRouter.get('/:transactionId', auth, getById);

transactionsRouter.post('/', auth, add);

transactionsRouter.patch('/:transactionId', auth, edit);

transactionsRouter.delete('/:transactionId', auth, remove);
