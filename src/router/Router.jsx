import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import NotFound from '../pages/NotFound/NotFound';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DashboardPage />,
      children: [
        { path: 'home', element: <div>HOME</div> },
        { path: 'statistics', element: <div>STATS</div> },
        { path: 'currency', element: <div>CURRENCY</div> },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <RegisterPage /> },
    { path: '*', element: <NotFound /> },
  ],
  { basename: '/wallet' },
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
