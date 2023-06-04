import React from 'react';
import css from './MobileTransaction.module.css';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { updateIsModalEditTransactionOpen } from '../../../../redux/Slices/global/globalSlice';
import { deleteTransaction } from '../../../../redux/Slices/finance/operations';
import { updateSelectedTransaction } from '../../../../redux/Slices/finance/financeSlice';

export const MobileTransaction = ({
  transactionDate,
  typeOfTransaction,
  categoryId,
  comment,
  amountOfTransaction,
  _id,
  categoriesArray,
  getCategoryNameFromArr,
}) => {
  const sumColor = typeOfTransaction === 'Income' ? css.greenSum : css.redSum;
  const borderColor = typeOfTransaction === 'Income' ? css.greenBorder : css.redBorder;
  const dispatch = useDispatch();
  const categoryName = getCategoryNameFromArr(categoryId, categoriesArray);
  return (
    <li className={`${css.transactionBox} ${borderColor}`}>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Date</span>
        <span className={css.transactionDetailValue}>{transactionDate.slice(0, 10)}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Type</span>
        <span className={css.transactionDetailValue}>
          {typeOfTransaction === 'Income' ? '+' : '-'}
        </span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Category</span>
        <span className={css.transactionDetailValue}>
          {categoryName === undefined ? categoryId : categoryName}
        </span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Comment</span>
        <span className={css.transactionDetailValue}>{comment}</span>
      </div>
      <div className={css.transactionSubBox}>
        <span className={css.transactionDetailName}>Sum</span>
        <span className={`${css.sumBox} ${sumColor}`}>{amountOfTransaction.toFixed(2)}</span>
      </div>
      <div className={css.transactionSubBox}>
        <button
          onClick={() => {
            dispatch(deleteTransaction(_id));
          }}
          className={css.deleteButton}
          type="button"
        >
          Delete
        </button>
        <div
          onClick={() => {
            dispatch(updateIsModalEditTransactionOpen(true));
            dispatch(updateSelectedTransaction(_id));
          }}
          className={css.editBox}
        >
          <ReactSVG className={css.editIcon} src="/svg/edit_icon.svg" />
          <span className={css.editTransaction}>Edit</span>
        </div>
      </div>
    </li>
  );
};
