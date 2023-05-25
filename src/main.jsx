import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './index.css';

import Store, { persistor } from './redux/Store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {' '}
    <PersistGate loading="null" persistor={persistor}>
      <Provider store={Store}>
        <App />
        <ToastContainer />
      </Provider>
    </PersistGate>
  </>,
);
