// import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ToRegisterButton.module.css';

const ToRegisterButton = () => {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/sign-up');
  };
  return (
    <div>
      <button className={css.btn} onClick={navigateToRegister}>
        Register
      </button>
    </div>
  );
};

export default ToRegisterButton;
