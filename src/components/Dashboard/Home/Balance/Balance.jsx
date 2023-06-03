import React from 'react';
import css from './Balance.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFinanceBalance, selectFinanceData } from '../../../../redux/selectors';
import { useEffect } from 'react';
import { getAllTransactions } from '../../../../redux/Slices/finance/operations';

export const Balance = () => {
  const transactions = useSelector(selectFinanceData);
  const yourBalance = transactions.length
    ? transactions.reduce(
        (acc, transaction) =>
          transaction.typeOfTransaction === 'Income'
            ? acc + transaction.amountOfTransaction
            : acc - transaction.amountOfTransaction,
        0,
      )
    : 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  return (
    <div className={css.balanceBox}>
      <span className={css.balanceTitle}>YOUR BALANCE</span>
      <span className={css.balanceAmount}>₴ {yourBalance}</span>
    </div>
  );
};
