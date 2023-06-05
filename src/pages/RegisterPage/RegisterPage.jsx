// import React from 'react'
import { useEffect, useState } from 'react';
import ToLoginButton from '../../components/RegisterPage/ToLoginButton';
import css from './RegisterPage.module.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/Slices/session/operations';
import { toast } from 'react-toastify';
import { object, string, ref } from 'yup';
import { useNavigate } from 'react-router';
import {
  resetRegisterForm,
  updateRegisterConfPassword,
  updateRegisterEmail,
  updateRegisterName,
  updateRegisterPassword,
} from '../../redux/Slices/session/sessionSlice';

const userSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password can not be longer than 12 characters')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match.')
    .required(),
  name: string()
    .min(1, 'Your name must be at least 1 characters')
    .max(12, 'Your name can not be longer than 12 characters')
    .required('Name is required'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.session.isAuth);
  const email = useSelector(state => state.session.registerForm.email);
  const password = useSelector(state => state.session.registerForm.password);
  const confirmPassword = useSelector(state => state.session.registerForm.confPassword);
  const name = useSelector(state => state.session.registerForm.name);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setConfirmedShowPassword] = useState(false);

  const handleEmailChange = event => {
    dispatch(updateRegisterEmail(event.target.value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmedPasswordVisibility = () => {
    setConfirmedShowPassword(!showConfirmedPassword);
  };

  const handlePasswordChange = event => {
    dispatch(updateRegisterPassword(event.target.value));
    setPasswordStrength(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    dispatch(updateRegisterConfPassword(event.target.value));
  };

  const handleNameChange = event => {
    dispatch(updateRegisterName(event.target.value));
  };

  const handleRegisterFormReset = () => {
    dispatch(resetRegisterForm());
  };
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const formValidationData = {
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      name: data.get('name'),
    };
    try {
      await userSchema.validate(formValidationData, { abortEarly: false });

      const response = await dispatch(
        signUp({
          username: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
          doubledPassword: data.get('confirmPassword'),
        }),
      );

      if (response.meta.requestStatus === 'fulfilled') {
        form.reset();
        handleRegisterFormReset();
        navigate(`/verifyEmail/?user=${email}`)
      }
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
      <ReactSVG className={css.peach} src="/svg/ellipse_peach.svg" />
      <ReactSVG className={css.violet} src="/svg/ellipse_violet.svg" />
      <ReactSVG className={css.woman} src="/svg/picture_with_woman.svg" />
      <p className={css.name}>Finance App</p>
      <div className={css.blur}>
        <div className={css['form-container']}>
          <div className={css['title-container']}>
            <ReactSVG className={css.icon} src="/svg/wallet_icon.svg" />
            <ReactSVG
              className={css.text}
              src="/svg/wallet_text.svg"
              beforeInjection={svg => {
                svg.classList.add('css.text');
              }}
            />
          </div>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css['email-container']}>
              <ReactSVG className={css['email-icon']} src="/svg/email_icon.svg" />
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
              <ReactSVG className={css['password-icon']} src="/svg/lock_icon.svg" />
              <ReactSVG
                className={css['hide-password-icon']}
                onClick={togglePasswordVisibility}
                src={showPassword ? '/svg/eye.svg' : '/svg/eye-blocked.svg'}
              />
              <input
                className={css.password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                required
              ></input>
            </div>
            <div className={css['password-container']}>
              <ReactSVG className={css['password-icon']} src="/svg/lock_icon.svg" />
              <ReactSVG
                className={css['hide-password-icon']}
                onClick={toggleConfirmedPasswordVisibility}
                src={showConfirmedPassword ? '/svg/eye.svg' : '/svg/eye-blocked.svg'}
              />
              <input
                className={css.password}
                type={showConfirmedPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              ></input>
              <PasswordStrengthBar
                className={css['password-strength-bar']}
                password={passwordStrength}
                scoreWordClassName={css.scoreWord}
                barColors={['#ddd', '#24cca7', '#24cca7', '#24cca7', '#24cca7']}
              />
            </div>

            <div className={css['name-input-container']}>
              <ReactSVG className={css['name-input-icon']} src="/svg/user_icon.svg" />
              <input
                className={css['name-input']}
                type="text"
                id="name"
                name="name"
                placeholder="First name"
                value={name}
                onChange={handleNameChange}
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
