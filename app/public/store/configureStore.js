import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';

import rootReducer from '../reducers'
import routes from '../routes';



var buildStore

if (__DEBUG__) {
    buildStore = compose(
        applyMiddleware(thunk),
        reduxReactRouter({
            routes,
            createHistory
        }),
        require('redux-devtools').devTools(),
        require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
} else {
    buildStore = compose(applyMiddleware(thunk),
        reduxReactRouter({
            routes,
            createHistory
        }))(createStore)
}


export default function configureStore(initialState) {
  const store = buildStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers'))
    })
  }

  return store
}
