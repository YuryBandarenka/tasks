import "babel-polyfill";


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../css/index.css';


import store from './store';

import App from './components/App';




const root = document.getElementById('react_root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
);
