import { ReactSVG } from 'react-svg';
import styles from './Header.module.css';

const Header = () => {
  const userName = 'Heniu69';
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.content__logo}>
          {' '}
          <img className={styles.logo__icon} src="/svg/wallet_icon.svg" alt="logo" />{' '}
          <img className={styles.logo__text} src="/svg/wallet_text.svg" alt="logo" />
        </div>
      

        <div className={styles.content__user}>
          <span className={styles.user__name}>{userName}</span>
          <div className={styles.user__vertLine} />
          <ReactSVG
            src="/svg/icon-exit1.svg"
            alt="logout-button"
            aria-label="logout button"
            className={styles.user__logout}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
