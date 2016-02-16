import * as types from '../constants/index'
import reqwest from 'reqwest'

let id = 1;
let condition = {}

export function setId(nid) {
    id=nid;
}

export function setCondition(ncondition) {
    condition=ncondition;
}


let apiurl = 'http://127.0.0.1:3333/dbcfg';

export function getSider() {
    return dispatch => {
        reqwest({
            url:'/menu',
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
        reqwest({
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
        reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'update',
                data:JSON.stringify(data),
                id: id
            },
            success: function(json) {
                if(json.result.code==0) {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'success',
                        text:'更新成功'
                    })
                }else {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'error',
                        text:json.result.msg
                    })
                }
            }
        })
    }
}

export function deleteData(data) {
    return dispatch => {
        reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'delete',
                data:JSON.stringify(data),
                id: id
            },
            success: function(json) {
                if(json.success) {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'success',
                        text:'操作成功'
                    })
                    dispatch(getData({condition}))
                }else {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'error',
                        text:json.result.msg
                    })
                }
            }
        })
    }
}


export function addData(data) {
    return dispatch => {
        reqwest({
            url:apiurl,
            method:'post',
            data: {
                op:'insert',
                data:JSON.stringify(data),
                id: id
            },
            success: function(json) {
                if(json.success) {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'success',
                        text:'操作成功'
                    })
                    dispatch(getData({condition}))
                }else {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'error',
                        text:json.result.msg
                    })
                }
            }
        })
    }
}
