import { BrowserRouter as Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import NotFound from '../pages/NotFound/NotFound';

const router = () => {
  return (
    <Routes>
      <Route exact path="/" component={<DashboardPage />} />
      <Route exact path="/login" component={<LoginPage />} />
      <Route exact path="/sign-up" component={<RegisterPage />} />
      <Route component={<NotFound />} />
    </Routes>
  );
};

export default router;
