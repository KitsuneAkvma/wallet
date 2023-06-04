import css from './TransactionList.module.css';
import { ReactSVG } from 'react-svg';
import { MobileTransaction } from '../MobileTransaction/MobileTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { Transaction } from '../Transaction/Transaction';
import { Balance } from '../Balance/Balance';
import Media from 'react-media';
import { TransactionListHeader } from '../TransactionListHeader/TransactionListHeader';
import { TransactionModal } from '../../TransactionModal/Transaction';
import { updateIsModalAddTransactionOpen } from '../../../../redux/Slices/global/globalSlice';
import { EditTransaction } from '../../TransactionModal/EditTransaction';
import { useEffect } from 'react';
import { selectFinanceCategories, selectFinanceData } from '../../../../redux/selectors';
import { fetchCategories, getAllTransactions } from '../../../../redux/Slices/finance/operations';

export const TransactionList = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  const transactions = useSelector(selectFinanceData);
  const categoriesArray = useSelector(selectFinanceCategories);
  const dispatch = useDispatch();

  const getCategoryNameFromArr = (id, array) => {
    const record = array.filter(record => record._id === id);
    const categoryName = record[0].name;
    return categoryName;
  }
  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      <Media queries={queries}>
        {matches => (
          <>
            {matches.mobile && (
              <>
                <Balance />
                <ul className={css.transactionList}>
                  {transactions.map(transaction => (
                    <MobileTransaction
                      key={transaction._id}
                      {...transaction}
                      categoriesArray={categoriesArray}
                      getCategoryNameFromArr={getCategoryNameFromArr}
                    />
                  ))}
                </ul>
              </>
            )}
            {!matches.mobile && (
              <div className={css.transactionListContainer}>
                <TransactionListHeader />
                <ul className={css.transactionList}>
                  {transactions.map(transaction => (
                    <Transaction
                      key={transaction._id}
                      {...transaction}
                      categoriesArray={categoriesArray}
                      getCategoryNameFromArr={getCategoryNameFromArr}
                    />
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Media>
      <TransactionModal />
      <EditTransaction />
      <ReactSVG
        onClick={() => {
          dispatch(updateIsModalAddTransactionOpen(true));
        }}
        className={css.addTransactionIcon}
        src="/svg/plus_icon.svg"
      />
    </>
  );
};
