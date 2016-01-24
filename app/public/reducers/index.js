import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router';

import list from './list'
import sider from './sider'

//多个reducer
const rootReducer = combineReducers({
    list,
    sider,
    router
})

export default rootReducer
