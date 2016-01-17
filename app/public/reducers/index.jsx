import { combineReducers } from 'redux'
import counter from './counter'

//多个reducer
const rootReducer = combineReducers({
  counter
})

export default rootReducer
