// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import css from './ToLoginButton.module.css';

const ToLoginButton = () => {
  // const navigate = useNavigate();
  const navigateToLogin = () => {
    // navigate('/signup');
  };
  return (
    <div>
      <button className={css.btn} onClick={navigateToLogin}>
        Log In
      </button>
    </div>
  );
};

export default ToLoginButton;
