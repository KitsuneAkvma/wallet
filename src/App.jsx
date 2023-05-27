import React from 'react';

import './App.css';
import 'sanitize.css';
import 'modern-normalize/modern-normalize.css';

import { LazyRouter } from './utility/lazyComponents/lazyComponents';
import Loader from './components/_General/Loader/Loader';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <LazyRouter />
      </React.Suspense>{' '}
      <ToastContainer />
    </>
  );
}

export default App;
