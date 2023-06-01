import React from 'react';
import css from './Balance.module.css';

export const Balance = () => {
  return (
    <div className={css.balanceBox}>
      <span className={css.balanceTitle}>YOUR BALANCE</span>
      <span className={css.balanceAmount}>₴ 24 000.00</span>
    </div>
  );
};
