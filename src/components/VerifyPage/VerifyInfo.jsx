import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import css from './VerifyInfo.module.css';
import { useLocation } from 'react-router-dom';
import { resendEmailVerification } from '../../redux/Slices/session/operations';

const VerifyInfo = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('user');

  const handleButtonClick = () => {
    setIsButtonDisabled(true);
    setTimeLeft(180); // 3 minutes in seconds
    dispatch(resendEmailVerification(email));
    setTimeout(() => {
      setIsButtonDisabled(false);
      setTimeLeft(0);
    }, 3 * 60 * 1000); // 3 minutes in milliseconds
  };

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000); // 1 second interval
    }
    return () => {
      clearInterval(timer);
    };
  }, [isButtonDisabled]);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className={css.verificationInfoModal}>
      <h1 className={css.verificationInfo__title}>Great you are in🎉</h1>

      <div className={css.verificationInfo__desc}>
        <p className={css.desc__item}>
          Now last thing you need to do to finish your registration is to verify your email address.
        </p>
        <p className={css.desc__item}>
          Please check your email inbox and click on the link we have sent you to verify your email
          address.
        </p>
        <p className={css.desc__item}>
          If you don’t see the email, please check your spam folder. If you still can’t find the
          email, please contact us at{' '}
          <a href="mailto:mateusz.r.martin@gmail.com" className={css.desc__item__highlight}>
            mateusz.r.martin@gmail.com
          </a>
          . or click button bellow:
        </p>
      </div>
      <button
        className={css.verificationInfo__button}
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? `Resending... (${formatTimeLeft()})` : 'Resend email'}
      </button>
    </div>
  );
};
export default VerifyInfo;
