import { findTransactionsByTypeAndDate } from '../dbControllers/transactions.js';

export const monthlyBalance = async (req, res, next) => {
  const { date } = req.body;
  const { id } = req.user;

  try {
    if (!date) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad request - missing date field',
      });
    }
    const incomeTransactions = await findTransactionsByTypeAndDate(date, 'Income', id);
    const incomeValue = incomeTransactions
      .map(transaction => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);
    const expenseTransactions = await findTransactionsByTypeAndDate(date, 'Expense', id);
    const expenseValue = expenseTransactions
      .map(transaction => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);
    const balanceForMonth = Number(incomeValue - expenseValue);
    const usedCategoryIds = expenseTransactions
      .map(transaction => transaction.categoryId)
      .filter((categoryId, index, array) => array.indexOf(categoryId) === index);

    let categoryIdValues = [];
    for (const categoryId of usedCategoryIds) {
      const valueByCategory = expenseTransactions
        .filter(transaction => transaction.categoryId === categoryId)
        .map(transaction => transaction.amountOfTransaction)
        .reduce((previousValue, number) => {
          return previousValue + number;
        }, 0);
      categoryIdValues.push(valueByCategory);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        incomeValue,
        expenseValue,
        balanceForMonth,
        usedCategoryIds,
        categoryIdValues,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
