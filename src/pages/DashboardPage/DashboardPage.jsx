import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <section>
      <div>DashboardPage</div>
      <Outlet />
    </section>
  );
};
export default DashboardPage;
