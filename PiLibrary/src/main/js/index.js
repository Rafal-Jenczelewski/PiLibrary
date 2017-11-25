import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from "react-redux";
import myStore from './store'


ReactDOM.render(<Provider
    store={myStore}><App/></Provider>, document.getElementById('react'));
