import { Navigate } from 'react-router-dom';
import { useAuth } from '../utility/hooks/useAuth';

// If the route is private and the user is logged in, render the component
//  Otherwise render <Navigate> to Home

export const PrivateRoute = Component => {
  const { isLoggedIn } = useAuth();
  const shouldRedirect = !isLoggedIn;
  console.log(isLoggedIn);

  return shouldRedirect ? <Navigate to="/" /> : <Component/>;
};
