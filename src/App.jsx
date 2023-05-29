import './App.css';
import 'sanitize.css';
import 'modern-normalize/modern-normalize.css';

import Loader from './components/_General/Loader/Loader';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={'register'} element={<RegisterPage />} />
          <Route path={'login'} element={<LoginPage />} />
          <Route
            path={'home'}
            element={
              <>
                <h1>Home</h1>
                <button onClick={() => navigate('/login')}>Log In</button>
                <button onClick={() => navigate('/register')}>register</button>
              </>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
