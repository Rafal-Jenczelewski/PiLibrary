import combineReducers from 'redux'
import * as reducers from './reducers'

export default allReducers = combineReducers({
    files: reducers.filesReducer,
    links: reducers.linksReducer,
    pageSize: reducers.pageSizeReducer
})
