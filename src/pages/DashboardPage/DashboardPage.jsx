import { Outlet } from 'react-router-dom';

import Header from '../../components/_General/Header/Header';

const DashboardPage = () => {

  return (
    <>
      <Header />
      <section>
        <div>DashboardPage</div>
        <Outlet />
      </section>
    </>
  );
};
export default DashboardPage;
