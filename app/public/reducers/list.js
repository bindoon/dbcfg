import { LIST_GET,SHOW_MSG,CLEAR_MSG } from '../constants/index'
import { combineReducers } from 'redux'

const initialState = {
     columns:[],data:[],addNum:3
};

function list(state = initialState, action) {
    switch (action.type) {
        case LIST_GET:
            return Object.assign({}, state, action.data.result);
            break;

        default:
            return state;
    }
}

export default list;
