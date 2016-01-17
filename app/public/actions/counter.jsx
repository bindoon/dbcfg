import {INCREMENT_COUNTER,DECREMENT_COUNTER} from '../constants/actionTypes'

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

export function test () {
    return 1;
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
