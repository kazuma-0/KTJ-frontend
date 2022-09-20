import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/store';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import SupabaseContext from './context/SupabaseContext';
import client from './supabase/client';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <React.StrictMode> */}
      <ChakraProvider>
        <SupabaseContext.Provider value={client}>
          <App />
        </SupabaseContext.Provider>
      </ChakraProvider>
    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
