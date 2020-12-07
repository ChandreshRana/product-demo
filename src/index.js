import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import './styles/main.less';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
