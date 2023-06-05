import { ReactSVG } from 'react-svg';
import VerifyInfo from '../../components/VerifyPage/VerifyInfo';
import css from './VerifyPage.module.css';
import { useLocation } from 'react-router-dom';
import Verified from '../../components/VerifyPage/Verified';

const VerifyPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('user');
  const token = queryParams.get('token');
  return (
    <main className={css.VerifyPage}>
      {token && <Verified />}
      {email && <VerifyInfo />}
      <ReactSVG className={css.VerifyPage__blob_peach} src="/svg/ellipse_peach.svg" />
      <ReactSVG className={css.VerifyPage__blob_violet} src="/svg/ellipse_violet.svg" />
    </main>
  );
};
export default VerifyPage;
