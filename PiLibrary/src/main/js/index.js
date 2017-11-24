import React from 'react';
import {createStore, applyMiddleware} from "redux";
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from "../reducers/index";
import App from './components/App'

const logger = createLogger();
export const myStore = createStore(allReducers,
    applyMiddleware(logger, thunk, promise));

ReactDOM.render(<Provider
    store={myStore}><App/></Provider>, document.getElementById('react'));
