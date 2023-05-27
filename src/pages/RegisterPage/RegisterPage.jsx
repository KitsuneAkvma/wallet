// import React from 'react'
import { useState } from 'react';
import ToLoginButton from '../../components/RegisterPage/ToLoginButton';
import css from './RegisterPage.module.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ReactSVG } from 'react-svg';

const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <div className={css.container}>
      <ReactSVG className={css.peach} src="../../public/svg/ellipse_peach.svg" />
      <ReactSVG className={css.violet} src="../../public/svg/ellipse_violet.svg" />
      <ReactSVG className={css.woman} src="../../public/svg/picture_with_woman.svg" />
      <p className={css.name}>Finance App</p>
      <div className={css.blur}>
        <div className={css['form-container']}>
          <div className={css['title-container']}>
            <ReactSVG className={css.icon} src="../../public/svg/wallet_icon.svg" />
            <ReactSVG
              className={css.text}
              src="../../public/svg/wallet_text.svg"
              beforeInjection={svg => {
                svg.classList.add('css.text');
              }}
            />
          </div>
          <form className={css.form}>
            <div className={css['email-container']}>
              <ReactSVG className={css['email-icon']} src="../../public/svg/email_icon.svg" />
              <input
                className={css.email}
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                required
              ></input>
            </div>
            <div className={css['password-container']}>
              <ReactSVG className={css['password-icon']} src="../../public/svg/lock_icon.svg" />
              <input
                className={css.password}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              ></input>
            </div>
            <div className={css['password-container']}>
              <ReactSVG className={css['password-icon']} src="../../public/svg/lock_icon.svg" />
              <input
                className={css.password}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                required
              ></input>
              <PasswordStrengthBar
                className={css['password-strength-bar']}
                password={password}
                scoreWordClassName={css.scoreWord}
                barColors={['#ddd', '#24cca7', '#24cca7', '#24cca7', '#24cca7']}
              />
            </div>

            <div className={css['name-input-container']}>
              <ReactSVG className={css['name-input-icon']} src="../../public/svg/user_icon.svg" />
              <input
                className={css['name-input']}
                type="text"
                id="name"
                name="name"
                placeholder="Firs name"
                required
              ></input>
            </div>

            <button className={css.btn} type="submit">
              Register
            </button>
          </form>
          <ToLoginButton />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
