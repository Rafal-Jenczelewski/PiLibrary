import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from "react-redux";
import myStore from './store'
import {Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Popup from 'react-popup'


ReactDOM.render(
    <BrowserRouter>
        <Provider
            store={myStore}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('react'));
ReactDOM.render(
    <Popup/>,
    document.getElementById('popup')
);
