import { useSelector } from 'react-redux';
import { selectSessionIsAuth, selectSessionToken, selectSessionUser } from '../../redux/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectSessionIsAuth);
  const user = useSelector(selectSessionUser);
  const token = useSelector(selectSessionToken);

  return { isLoggedIn, user, token };
};
