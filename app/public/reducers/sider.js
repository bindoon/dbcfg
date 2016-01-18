import { SIDER_GET } from '../constants/index'

const initialState = {
    list : [],
};

export default function sider(state = initialState, action) {
    switch (action.type) {
        case SIDER_GET:
            return Object.assign({}, state, {
                list: action.data.result.list
            });
        default:
            return state;
    }
}
