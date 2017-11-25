import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './reducers/index'
import {createStore, applyMiddleware} from "redux";

const logger = createLogger();
export default createStore(allReducers,
    applyMiddleware(logger, thunk, promise));