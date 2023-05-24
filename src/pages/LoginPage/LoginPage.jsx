import React from 'react';
import css from './LoginPage.module.css';
import ToRegisterButton from '../../components/LoginPage/ToRegisterButton';

const LoginPage = () => {
  return (
    <div className={css.container}>
      <div className={css['form-container']}>
        <div className={css['title-container']}>
          {/* <svg className={css.icon}>
            <use href="#wallet"></use>
          </svg> */}
          <h2 className={css.title}>Wallet</h2>
        </div>
        <form className={css.form}>
          <input
            className={css.email}
            type="text"
            id="email"
            name="email"
            placeholder="E-mail"
            required
          ></input>

          <input
            className={css.password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          ></input>

          <button className={css.btn} type="submit">
            Log in
          </button>
        </form>
        <ToRegisterButton />
      </div>
    </div>
  );
};

export default LoginPage;
