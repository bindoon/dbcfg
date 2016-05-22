import * as types from '../constants/index';
import reqwest from 'reqwest';

let id = 1;
let condition = {}

export function setId(nid) {
    id=nid;
}

export function setCondition(ncondition) {
    condition=ncondition;
}


let apiurl = '/api/dbcfg';

export function getSider() {
    return dispatch => {
        return reqwest({
            url:'/api/menu',
            type:'json',
            success: function(json) {
                dispatch({
                    type:types.SIDER_GET,
                    data:json
                })
            }
        })
    }
}

export function getData(op={}) {
    return dispatch => {
        return reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'query',
                condition:op.condition? JSON.stringify(op.condition):'',
                pagination:op.pagination? JSON.stringify(op.pagination):'',
                id: id
            },
            success: function(json) {
                dispatch({
                    type:types.LIST_GET,
                    data:json
                })
            }
        })
    }
}

export function updateData(data) {
    return dispatch => {
        return reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'update',
                data:JSON.stringify(data),
                id: id
            }
        })
    }
}

export function deleteData(data) {
    return dispatch => {
        return reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'delete',
                data:JSON.stringify(data),
                id: id
            },
            success: function(json) {
                if(json.success) {
                    dispatch(getData({condition}))
                }
            }
        })
    }
}


export function addData(data) {
    return dispatch => {
         return reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'insert',
                data:JSON.stringify(data),
                id: id
            },
            success: function(json) {
                if (json.success) {
                    dispatch(getData({condition}))
                }
            }
        })
    }
}
