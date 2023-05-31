import { Balance } from '../../components/Dashboard/Home/Balance/Balance.jsx';
import { TransactionList } from '../../components/Dashboard/Home/TransactionList/TransactionList.jsx';
import { CurrencyDummy } from '../../components/Dashboard/CurrencyDummy/CurrencyDummy.jsx';
import { ReactSVG } from 'react-svg';
import { Outlet } from 'react-router';
import Media from 'react-media';
import css from './DashboardPage.module.css';

const DashboardPage = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  return (
    <>
      <section className={css.container}>
        <Media queries={queries}>
          {matches => (
            <>
              {matches.mobile && (
                <>
                  <div className={css.navigationIconsBox}>
                    <ReactSVG className={css.navigationIcon} src="../../svg/home_icon.svg" />
                    <ReactSVG className={css.navigationIcon} src="../../svg/statistics_icon.svg" />
                    <ReactSVG className={css.navigationIcon} src="../../svg/currency_icon.svg" />
                  </div>
                  {/* <Outlet /> */}
                  <Balance />
                  <TransactionList />
                </>
              )}
              {!matches.mobile && (
                <>
                  <div className={css.navBalanceAndCurrencyBox}>
                    <div className={css.navBalanceBox}>
                      <div className={css.navBox}>
                        <ReactSVG className={css.navigationIcon} src="../../svg/home_icon.svg" />
                        <span className={css.navLink}>Home</span>
                      </div>
                      <div className={css.navBox}>
                        <ReactSVG
                          className={css.navigationIcon}
                          src="../../svg/statistics_icon.svg"
                        />
                        <span className={css.navLink}>Statistics</span>
                      </div>
                      <Balance />
                    </div>
                    <CurrencyDummy />
                  </div>
                  <TransactionList />
                </>
              )}
            </>
          )}
        </Media>
        <ReactSVG className={css.addTransactionIcon} src="../../svg/plus_icon.svg" />
      </section>
    </>
  );
};
export default DashboardPage;
