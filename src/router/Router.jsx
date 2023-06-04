import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RestrictedRoutes from './RestrictedRoutes';
import PrivateRoutes from './PrivateRoutes';
import NotFound from '../pages/NotFound/NotFound';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { TransactionList } from '../components/Dashboard/Home/TransactionList/TransactionList';
import CurrencyTable from '../components/Dashboard/Currency/Currency';
import { Diagram } from '../components/Dashboard/Statistics/Diagram';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<DashboardPage />}>
            <Route index element={<TransactionList />} />
            <Route path="currencies" element={<CurrencyTable />} />
            <Route path="statistics" element={<Diagram />} />
          </Route>
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
// Restricted and private routes don't work correctly. There is problem with getting state "isAuth". Change variable isLoggedIn in useAuth manually to test.

export default Router;
