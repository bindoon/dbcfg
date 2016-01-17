'use strict';

import 'antd/lib/index.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Root from './root'
import configureStore from './store/configureStore'

const store = configureStore()

/*
dispatch
getState
replaceReducer
subscribe
 */


function renderDevTools(store) {
    if (__DEBUG__) {
        let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')

        return (
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        )
    }

    return null
}

render(
    <div>
        <Provider store={store}>
            <Root />
        </Provider>
        {renderDevTools(store)}
    </div>        ,
  document.getElementById('container')
)
