import { useState } from 'react';
import css from './UserOptions.module.css';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../../redux/Slices/session/operations';
import { useNavigate } from 'react-router-dom';

export const UserOptions = () => {
  const [doWantToSignOut, setDoWantToSignOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    setDoWantToSignOut(true);
  };
  const handleCancelSignOut = () => {
    setDoWantToSignOut(false);
  };
  const handleConfirmSignOut = () => {
    setDoWantToSignOut(false);
    dispatch(signOut());
    navigate('/login');
  };
  return (
    <>
      <h3 className={css.UserOptions__title}>Settings</h3>
      <div className={css.UserOptions__content}>
        <ul className={css.UserOptions__options}>Nothing in here yet... </ul>
        <div className={css.options__item_signOut}>
          {' '}
          {!doWantToSignOut ? (
            <button className={css.signOut_button} onClick={handleSignOut}>
              {' '}
              Sign Out 🙈
            </button>
          ) : (
            <>
              <h4 className={css.signOut_title}>Are you sure ? </h4>
              <p className={css.signOut_desc}>This action will remove your account permanently!</p>
              <div className={css.signOut_choice}>
                <button className={css.options__item_signOut_yes} onClick={handleConfirmSignOut}>
                  Yes
                </button>
                <button className={css.options__item_signOut_no} onClick={handleCancelSignOut}>
                  no
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
