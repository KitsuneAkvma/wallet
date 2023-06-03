import React from 'react';
import css from './Transaction.module.css';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { updateIsModalEditTransactionOpen } from '../../../../redux/Slices/global/globalSlice';
import { deleteTransaction } from '../../../../redux/Slices/finance/operations';

export const Transaction = ({
  transactionDate,
  typeOfTransaction,
  categoryId,
  comment,
  amountOfTransaction,
  _id,
}) => {
  const sumColor = typeOfTransaction === 'Income' ? css.greenSum : css.redSum;
  const dispatch = useDispatch();
  return (
    <li className={css.transactionBox}>
      <div className={css.dateBox}>{transactionDate.slice(0, 10)}</div>
      <div className={css.typeBox}>{typeOfTransaction === 'Income' ? '+' : '-'}</div>
      <div className={css.categoryBox}>{categoryId}</div>
      <div className={css.commentBox}>{comment}</div>
      <div className={`${css.sumBox} ${sumColor}`}>{amountOfTransaction}</div>
      <div className={css.editDeleteBox}>
        <ReactSVG
          onClick={() => {
            dispatch(updateIsModalEditTransactionOpen(true));
          }}
          className={css.editIcon}
          src="/svg/edit_icon.svg"
        />
        <button
          // onClick={dispatch(deleteTransaction(_id))}
          className={css.deleteButton}
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
