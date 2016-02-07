import * as types from '../constants/index'
import reqwest from 'reqwest'

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

export function getList(condition={}) {
    return dispatch => {
        reqwest({
            url:'/dbcfg',
            method:'post',
            data: {
                op:'query',
                condition:JSON.stringify(condition),
                pagination:'{"totalItems":0,"currentPage":1,"totalPage":1}',
                id: "1"
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

export function updateList(list) {
    return dispatch => {
        reqwest({
            url:'dbcfg',
            method:'post',
            data: {
                op:'update',
                list:JSON.stringify(list),
                table: "indexdata"
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

export function deleteList(list) {
    return dispatch => {
        reqwest({
            url:'dbcfg',
            method:'post',
            data: {
                op:'delete',
                list:JSON.stringify(list),
                table: "indexdata"
            },
            success: function(json) {
                if(json.success) {
                    dispatch({
                        type:types.SHOW_MSG,
                        mtype:'success',
                        text:'操作成功'
                    })
                    dispatch(getList())
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


export function addList(list) {
    return dispatch => {
        reqwest({
            url:'/dbcfg',
            method:'post',
            data: {
                op:'insert',
                list:JSON.stringify(list),
                table: "indexdata"
            },
            success: function(json) {
                dispatch({
                    type:types.LIST_GET,
                    data:json
                })
                dispatch(getList())
            }
        })
    }
}
