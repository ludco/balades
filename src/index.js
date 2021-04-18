import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/bootstrap-custom.scss';
import './style/style.scss';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

const store = configureStore();

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
