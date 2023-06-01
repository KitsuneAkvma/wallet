import express from 'express';
export const summaryRouter = express.Router();
import { auth } from '../services/controllers/authOperations.js';
import { getCategories } from '../services/controllers/categoriesOperations.js';
import { monthlyBalance } from '../services/controllers/summaryOperations.js';

summaryRouter.get('/transaction-categories', auth, getCategories);

summaryRouter.get('/transactions-summary', auth, monthlyBalance);
