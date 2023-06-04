import { useEffect } from 'react';
import styles from './Logout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectGlobalModalLogoutState } from '../../../redux/selectors';
import { updateIsModalLogoutOpen } from '../../../redux/Slices/global/globalSlice';
import { logOut } from '../../../redux/Slices/session/operations';

export const LogoutModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectGlobalModalLogoutState);

  const handleCancel = () => {
    dispatch(updateIsModalLogoutOpen(false));
  };
  const handleLogout = () => {
    dispatch(updateIsModalLogoutOpen(false));
    dispatch(logOut());
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleCancel();
      }
    };

    const handleClickOutside = event => {
      if (event.target.classList.contains(styles.modal)) {
        handleCancel();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className={styles.modal} aria-label="Logout window">
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Are you really leaving us?🥺</p>
            <div className={styles.logoutBtn}>
              <button className={styles.yesBtn} onClick={handleLogout}>
                Logout
              </button>
              <button className={styles.noBtn} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
