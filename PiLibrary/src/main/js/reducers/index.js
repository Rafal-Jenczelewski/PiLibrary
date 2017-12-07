import {combineReducers} from 'redux'
import * as reducers from './reducers'

export default combineReducers({
    files: reducers.filesReducer,
    message: reducers.messageReducer,
    search: reducers.searchReducer
})
