import { Balance } from '../../components/Dashboard/Home/Balance/Balance.jsx';
import CurrencyTable from '../../components/Dashboard/Currency/Currency';
import { ReactSVG } from 'react-svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import Media from 'react-media';
import css from './DashboardPage.module.css';
import { NavLink } from 'react-router-dom';
import Header from '../../components/_General/Header/Header';

const DashboardPage = () => {
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };
  const [containerHeight, setContainerHeight] = useState(0);
  const location = useLocation()
  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(document.body.scrollHeight);
    };
    updateContainerHeight();
  }, [location]);
  return (
    <>
      <Header />

      <section className={css.container}>
        <Media queries={queries}>
          {matches => (
            <>
              {matches.mobile && (
                <>
                  <div className={css.navigationIconsBox}>
                    <NavLink to="/" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG className={css.navigationIcon} src="/svg/home_icon.svg" />
                    </NavLink>
                    <NavLink to="/statistics" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG className={css.navigationIcon} src="/svg/statistics_icon.svg" />
                    </NavLink>
                    <NavLink to="/currencies" className={({ isActive }) => isActive && css.active}>
                      <ReactSVG className={css.navigationIcon} src="/svg/currency_icon.svg" />
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
                          <ReactSVG className={css.navigationIcon} src="/svg/home_icon.svg" />
                          <span className={css.navLink}>Home</span>
                        </NavLink>
                      </div>
                      <div className={css.navBox}>
                        <NavLink
                          to="/statistics"
                          className={({ isActive }) => isActive && css.active}
                        >
                          <ReactSVG className={css.navigationIcon} src="/svg/statistics_icon.svg" />
                          <span className={css.navLink}>Statistics</span>
                        </NavLink>
                      </div>
                      <Balance />
                    </div>
                    <CurrencyTable />
                  </div>
                  <Outlet />
                </>
              )}
            </>
          )}
        </Media>
      </section>
      <div style={{ height: containerHeight }} className={css.ellipseContainer}>
        <ReactSVG className={css.ellipsePeach} src="/svg/ellipse_peach.svg" />
        <ReactSVG className={css.ellipseViolet} src="/svg/ellipse_violet.svg" />
      </div>
    </>
  );
};
export default DashboardPage;
