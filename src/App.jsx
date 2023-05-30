import React from 'react';

import './App.css';
import 'sanitize.css';
import 'modern-normalize/modern-normalize.css';

import { LazyRouter } from './utility/lazyComponents/lazyComponents';
import Loader from './components/_General/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './utility/hooks/useAuth';
import Header from './components/_General/Header/Header';

function App() {
  const isLoggedIn = useAuth();
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        {isLoggedIn && <Header />}
        <LazyRouter />
      </React.Suspense>{' '}
      <ToastContainer />
    </>
  );
}

export default App;
