import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import './styles/custom-bootstrap.scss';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line
import * as bootstrap from "bootstrap" ;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);