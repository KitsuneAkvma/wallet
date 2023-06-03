import React from 'react';
import css from './Balance.module.css';
import { useSelector } from 'react-redux';
import { selectFinanceBalance } from '../../../../redux/selectors';

export const Balance = () => {
  const yourBalance = useSelector(selectFinanceBalance);
  return (
    <div className={css.balanceBox}>
      <span className={css.balanceTitle}>YOUR BALANCE</span>
      <span className={css.balanceAmount}>₴ {yourBalance}</span>
    </div>
  );
};
