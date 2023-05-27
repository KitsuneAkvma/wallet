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
 
    <Provider store={Store}>

      <PersistGate loading="null" persistor={persistor}>

        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </>,
);
