import React from 'react';
import css from './MobileTransaction.module.css';

export const MobileTransaction = ({ date, type, category, comment, sum }) => {
  const sumColor = type === '+' ? css.greenSum : css.redSum;
  return (
    <li className={css.transactionBox}>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Date</span>
        <span className={css.transactionDetailValue}>{date}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Type</span>
        <span className={css.transactionDetailValue}>{type}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Category</span>
        <span className={css.transactionDetailValue}>{category}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Comment</span>
        <span className={css.transactionDetailValue}>{comment}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Sum</span>
        <span className={`${css.sumBox} ${sumColor}`}>{sum}</span>
      </div>
      <div className={css.transactionSubBox}>
        <button className={css.deleteButton} type="button">
          Delete
        </button>
        <span className={css.editTransaction}>Edit</span>
      </div>
    </li>
  );
};
