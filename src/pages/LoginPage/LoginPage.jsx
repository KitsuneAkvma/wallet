// import React from 'react';
import css from './LoginPage.module.css';
import ToRegisterButton from '../../components/LoginPage/ToRegisterButton';
import { ReactSVG } from 'react-svg';

const LoginPage = () => {
  return (
    <div className={css.container}>
      <ReactSVG className={css.peach} src="../../public/svg/ellipse_peach.svg" />
      <ReactSVG className={css.violet} src="../../public/svg/ellipse_violet.svg" />
      <ReactSVG className={css.man} src="../../public/svg/picture_with_man.svg" />
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
                required
              ></input>
            </div>

            <button className={css.btn} type="submit">
              Log in
            </button>
          </form>
          <ToRegisterButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
