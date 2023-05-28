import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

//  - If the route is restricted and the user is logged in, render a <Navigate> to Home
//   - Otherwise render the component

export const RestrictedRoute = Component => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/" /> : <Component />;
};
