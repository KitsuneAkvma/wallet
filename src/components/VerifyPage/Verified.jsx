import { useDispatch } from 'react-redux';

import css from './Verified.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUserEmail } from '../../redux/Slices/session/operations';

const Verified = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleButtonClick = () => {
    dispatch(verifyUserEmail(token));
    navigate('/login');
  };

  return (
    <div className={css.verifiedModal}>
      <h1 className={css.verifiedModal__title}>👋 Hello Again 👋</h1>

      <div className={css.verifiedModal__desc}>
        <p className={css.desc__item}>
          Thank you for verifying your email! You are now ready to explore our app. 🚀
        </p>
        <p className={css.desc__item}>
          We are excited to help you manage your finances and achieve your financial goals.
        </p>{' '}
        <p className={css.desc__item}>
          To get started, please click the <span className={css.desc__item__miniBtn}>button</span>
          below to proceed to the login page and log in using your registered email and password.
        </p>
      </div>
      <button className={css.verificationInfo__button} onClick={handleButtonClick}>
        Verify
      </button>
    </div>
  );
};
export default Verified;
