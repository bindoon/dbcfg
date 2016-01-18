import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router';

import counter from './counter'
import sider from './sider'

//多个reducer
const rootReducer = combineReducers({
    counter,
    sider,
    router
})

export default rootReducer
