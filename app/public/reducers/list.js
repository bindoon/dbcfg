import { LIST_GET,SHOW_MSG } from '../constants/index'
import { combineReducers } from 'redux'

const initialState = {
    result : {columns:[],data:[],addNum:3},
    msg:{}
};

function result(state = initialState.result, action) {
    switch (action.type) {
        case LIST_GET:
            return Object.assign({}, state, action.data.result);
            break;

        default:
            return state;
    }
}

function msg(state = initialState.msg, action) {
    switch (action.type) {
        case SHOW_MSG:
            return {
                mtype:action.mtype,
                text:action.text
            }
            break;

        default:
            return state;
    }
}

const list = combineReducers({
    result,
    msg,
})

export default list;
