import { useAuth } from '../utility/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

//  - If the route is restricted and the user is NOT logged in, render a <Navigate> to Login Page
//   - Otherwise render the component

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
