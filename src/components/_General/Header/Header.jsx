import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import styles from './Header.module.css';

import { selectSessionUser } from '../../../redux/selectors';
import { HeaderStripe } from '../HeaderStripe/HeaderStripe';
import {
  updateIsModalLogoutOpen,
  updateIsUserPanelOpen,
} from '../../../redux/Slices/global/globalSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSessionUser);
  const userName = user.username;
  const handleLogout = () => {
    dispatch(updateIsModalLogoutOpen(true));
  };
  const handleOpenUserPanel = () => {
    dispatch(updateIsUserPanelOpen(true));
  };

  return (
    <>
      <HeaderStripe />
      <header className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.content__logo}>
            {' '}
            <img className={styles.logo__icon} src="/svg/wallet_icon.svg" alt="logo" />{' '}
            <img className={styles.logo__text} src="/svg/wallet_text.svg" alt="logo" />
          </div>

          <div className={styles.content__user}>
            <span className={styles.user__name} onClick={handleOpenUserPanel} role="button">
              {userName}
            </span>
            <div className={styles.user__vertLine} />
            <ReactSVG
              src="/svg/icon-exit1.svg"
              alt="logout-button"
              aria-label="logout button"
              className={styles.user__logout}
              onClick={handleLogout}
            />
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
