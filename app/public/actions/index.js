import {INCREMENT_COUNTER,DECREMENT_COUNTER,SIDER_GET,LIST_GET} from '../constants/index'
import reqwest from 'reqwest'

export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState()

        if (counter % 2 === 0) {
            return
        }
        dispatch({
            type:INCREMENT_COUNTER
        })
    }
}

export function incrementAsync(delay = 1000) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type:INCREMENT_COUNTER
            })
        }, delay)
    }
}

export function getSider() {
    return dispatch => {
        reqwest({
            url:'/menu',
            type:'json',
            success: function(json) {
                dispatch({
                    type:SIDER_GET,
                    data:json
                })
            }
        })
    }
}


export function getList() {
    return dispatch => {
        reqwest({
            url:'/dbcfg',
            method:'post',
            data: {
                condition:'{}',
                op:'query',
                pagination:'{"totalItems":0,"currentPage":1,"totalPage":1}',
                table: "indexdata"
            },
            success: function(json) {
                dispatch({
                    type:LIST_GET,
                    data:json
                })
            }
        })
    }
}
