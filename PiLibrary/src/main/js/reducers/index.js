import {combineReducers} from 'redux'
import * as reducers from './reducers'

export default combineReducers({
    files: reducers.filesReducer,
    links: reducers.linksReducer,
    pageSize: reducers.pageSizeReducer,
    authHeader: reducers.authReducer
})
