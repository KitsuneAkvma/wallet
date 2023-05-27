import React from 'react';
import css from './TransactionListHeader.module.css';

export const TransactionListHeader = () => {
  return (
    <div className={css.transactionListHeader}>
      <div className={css.dateBox}>
        <span className={css.transactionDetailName}>Date</span>
      </div>
      <div className={css.typeBox}>
        <span className={css.transactionDetailName}>Type</span>
      </div>
      <div className={css.categoryBox}>
        <span className={css.transactionDetailName}>Category</span>
      </div>
      <div className={css.commentBox}>
        <span className={css.transactionDetailName}>Comment</span>
      </div>
      <div className={css.sumBox}>
        <span className={css.transactionDetailName}>Sum</span>
      </div>
      <div className={css.dummyBox}>
        <span className={css.transactionDetailDummy}></span>
      </div>
    </div>
  );
};
