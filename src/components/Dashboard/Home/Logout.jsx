import { useState, useEffect } from 'react';
import styles from './Logout.module.css';

export const LogoutModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = event => {
      if (event.target.classList.contains(styles.modal)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      <button onClick={openModal}>Exit</button>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Are you sure you want to log out</p>
            <div className={styles.logoutBtn}>
              <button className={styles.yesBtn}>Yes</button>
              <button className={styles.noBtn} onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
