import { Balance } from '../../components/Dashboard/Home/Balance/Balance.jsx';
import { CurrencyDummy } from '../../components/Dashboard/CurrencyDummy/CurrencyDummy.jsx';
import { ReactSVG } from 'react-svg';
import { Outlet } from 'react-router';
import Media from 'react-media';
import css from './DashboardPage.module.css';
import { NavLink } from 'react-router-dom';

import Header from '../../components/_General/Header/Header';
import { HeaderStripe } from '../../components/_General/HeaderStripe/HeaderStripe.jsx';

const DashboardPage = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  return (
    <>
      <HeaderStripe />
      <Header />
      <section className={css.container}>
        <Media queries={queries}>
          {matches => (
            <>
              {matches.mobile && (
                <>
                  <div className={css.navigationIconsBox}>
                    <NavLink to="/" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG className={css.navigationIcon} src="../../svg/home_icon.svg" />
                    </NavLink>
                    <NavLink to="/statistics" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG
                        className={css.navigationIcon}
                        src="../../svg/statistics_icon.svg"
                      />
                    </NavLink>
                    <NavLink to="/currencies" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG className={css.navigationIcon} src="../../svg/currency_icon.svg" />
                    </NavLink>
                  </div>
                  <Outlet />
                </>
              )}
              {!matches.mobile && (
                <>
                  <div className={css.navBalanceAndCurrencyBox}>
                    <div className={css.navBalanceBox}>
                      <div className={css.navBox}>
                        <NavLink to="/" className={({ isActive }) => isActive && css.active}>
                          <ReactSVG className={css.navigationIcon} src="../../svg/home_icon.svg" />
                          <span className={css.navLink}>Home</span>
                        </NavLink>
                      </div>
                      <div className={css.navBox}>
                        <NavLink
                          to="/statistics"
                          className={({ isActive }) => isActive && css.active}
                        >
                          <ReactSVG
                            className={css.navigationIcon}
                            src="../../svg/statistics_icon.svg"
                          />
                          <span className={css.navLink}>Statistics</span>
                        </NavLink>
                      </div>
                      <Balance />
                    </div>
                    <CurrencyDummy />
                  </div>
                  <Outlet />
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
