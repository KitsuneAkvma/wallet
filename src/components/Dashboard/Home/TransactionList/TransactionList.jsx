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
import { selectFinanceData } from '../../../../redux/selectors';
import { getAllTransactions } from '../../../../redux/Slices/finance/operations';

export const TransactionList = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  const transactions = useSelector(selectFinanceData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactions());
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
                    <MobileTransaction key={transaction.id} {...transaction} />
                  ))}
                </ul>
              </>
            )}
            {!matches.mobile && (
              <div className={css.transactionListContainer}>
                <TransactionListHeader />
                <ul className={css.transactionList}>
                  {transactions.map(transaction => (
                    <Transaction key={transaction.id} {...transaction} />
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
