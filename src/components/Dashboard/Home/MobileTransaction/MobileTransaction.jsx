import React from 'react';
import css from './MobileTransaction.module.css';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { updateIsModalEditTransactionOpen } from '../../../../redux/Slices/global/globalSlice';

export const MobileTransaction = ({ date, type, category, comment, sum }) => {
  const sumColor = type === '+' ? css.greenSum : css.redSum;
  const borderColor = type === '+' ? css.greenBorder : css.redBorder;
  const dispatch = useDispatch();
  return (
    <li className={`${css.transactionBox} ${borderColor}`}>
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
        <div
          onClick={() => {
            dispatch(updateIsModalEditTransactionOpen(true));
          }}
          className={css.editBox}
        >
          <ReactSVG className={css.editIcon} src="../../svg/edit_icon.svg" />
          <span className={css.editTransaction}>Edit</span>
        </div>
      </div>
    </li>
  );
};
