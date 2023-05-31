import { findTransactionsByTypeAndDate, listTransactions } from '../dbControllers/transactions.js';

export const getTransactionByCategories = async (req, res, next) => {
  try {
    const transactions = await listTransactions();
    res.json({
      status: 'success',
      code: 200,
      data: { transactions },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
export const monthlyBalance = async (req, res, next) => {
  const dateNow = new Date().toISOString();
  const { date = dateNow } = req.body;
  try {
    const incomeTransactions = await findTransactionsByTypeAndDate(date, 'Income');
    const incomeValue = incomeTransactions
      .map(transaction => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);
    const expenseTransactions = await findTransactionsByTypeAndDate(date, 'Expense');
    const expenseValue = expenseTransactions
      .map(transaction => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);
    const balanceForMonth = Number(incomeValue - expenseValue);
    const usedCategoryIds = expenseTransactions
      .map(transaction => transaction.categoryId)
      .filter((categoryId, index, array) => array.indexOf(categoryId) === index);
    res.json({
      status: 'success',
      code: 200,
      data: { incomeValue, expenseValue, balanceForMonth, usedCategoryIds },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
