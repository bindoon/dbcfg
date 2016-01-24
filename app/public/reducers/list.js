import { LIST_GET } from '../constants/index'

const initialState = {
    result : {columns:[],list:[],addNum:3},
};

export default function sider(state = initialState, action) {
    switch (action.type) {
        case LIST_GET:
            return Object.assign({}, state, {
                result: action.data.result
            });
        default:
            return state;
    }
}
