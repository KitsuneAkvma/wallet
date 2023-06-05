import { selectSessionUser } from '../../../../redux/selectors';
import { useSelector } from 'react-redux';
import css from './UserInfo.module.css';
import { ReactSVG } from 'react-svg';

export const UserInfo = () => {
  const user = useSelector(selectSessionUser);
  console.log(user);
  return (
    <>
      <h3 className={css.UserInfo__title}>User info</h3>
      <ul className={css.UserInfo__data}>
        <li className={css.data_item}>
          <span className={css.data__item__name}>Email: </span>
          <p className={css.data__item__content}> {user.email}</p>
        </li>
        <li className={css.data_item}>
          <span className={css.data__item__name}>Username: </span>
          <p className={css.data__item__content}> {user.username}</p>
        </li>{' '}
        <li className={css.data_item}>
          <span className={css.data__item__name}>Balance: </span>
          <p className={css.data__item__content}> {user.balance} ₴ </p>
        </li>
      </ul>

    </>
  );
};
