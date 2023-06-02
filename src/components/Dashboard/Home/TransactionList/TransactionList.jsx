import css from './TransactionList.module.css';
import { ReactSVG } from 'react-svg';
import { MobileTransaction } from '../MobileTransaction/MobileTransaction';
import { useDispatch } from 'react-redux';
import { Transaction } from '../Transaction/Transaction';
import { Balance } from '../Balance/Balance';
import Media from 'react-media';
import { TransactionListHeader } from '../TransactionListHeader/TransactionListHeader';
import { TransactionModal } from '../../TransactionModal/Transaction';
import { updateIsModalAddTransactionOpen } from '../../../../redux/Slices/global/globalSlice';

export const TransactionList = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  const dispatch = useDispatch();
  return (
    <>
      <Media queries={queries}>
        {matches => (
          <>
            {matches.mobile && (
              <>
                <Balance />
                <ul className={css.transactionList}>
                  <MobileTransaction
                    date="04.01.19"
                    type="-"
                    category="Other"
                    comment="Gift for your wife"
                    sum="300.00"
                  />
                </ul>
              </>
            )}
            {!matches.mobile && (
              <div className={css.transactionListContainer}>
                <TransactionListHeader />
                <ul className={css.transactionList}>
                  <Transaction
                    date="04.01.19"
                    type="-"
                    category="Other"
                    comment="Gift for your wife"
                    sum="300.00"
                  />
                  <Transaction
                    date="05.01.19"
                    type="+"
                    category="Income"
                    comment="January bonus"
                    sum="8 000.00"
                  />
                  <Transaction
                    date="07.01.19"
                    type="-"
                    category="Car"
                    comment="Oil"
                    sum="1000.00"
                  />
                  <Transaction
                    date="07.01.19"
                    type="-"
                    category="Products"
                    comment="Vegetables for the week"
                    sum="280.00"
                  />
                  <Transaction
                    date="07.01.19"
                    type="+"
                    category="Income"
                    comment="Gift"
                    sum="1 000.00"
                  />
                </ul>
              </div>
            )}
          </>
        )}
      </Media>
      <TransactionModal />
      <ReactSVG onClick={()=>{dispatch(updateIsModalAddTransactionOpen(true))}} className={css.addTransactionIcon} src="/svg/plus_icon.svg" />
    </>
  );
};
