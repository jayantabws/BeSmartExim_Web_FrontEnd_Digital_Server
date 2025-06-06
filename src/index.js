import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/ionicons.min.css';
import './assets/scss/style.scss';
import './assets/css/custom.css'

import store from './store/store';

const app = (
  <Provider store={store}>
     <React.StrictMode>
      <App />
     </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));