// import React from 'react';
import css from './LoginPage.module.css';
import ToRegisterButton from '../../components/LoginPage/ToRegisterButton';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Slices/session/operations';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  resetLoginForm,
  updateLoginEmail,
  updateLoginPassword,
} from '../../redux/Slices/session/sessionSlice';

const userSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password can not be longer than 12 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.session.isAuth);
  const email = useSelector(state => state.session.loginForm.email);
  const password = useSelector(state => state.session.loginForm.password);

  const handleEmailChange = event => {
    dispatch(updateLoginEmail(event.target.value));
  };

  const handlePasswordChange = event => {
    dispatch(updateLoginPassword(event.target.value));
  };
  const handleLoginFormReset = () => {
    dispatch(resetLoginForm());
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const formValidationData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      await userSchema.validate(formValidationData, { abortEarly: false });
      dispatch(
        login({
          email: data.get('email'),
          password: data.get('password'),
        }),
      );

      form.reset();
      handleLoginFormReset();
    } catch (error) {
      error.inner.forEach(validationError => {
        toast.warn(validationError.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
    }
  };

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
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css['email-container']}>
              <ReactSVG className={css['email-icon']} src="../../public/svg/email_icon.svg" />
              <input
                className={css.email}
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
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
                value={password}
                onChange={handlePasswordChange}
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
