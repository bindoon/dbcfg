import React from 'react'
import { render } from 'react-dom'

import {Router, Route, NotFoundRoute} from 'react-router'


import App from './containers/App'
//import UserPage from './containers/UserPage'
//import RepoPage from './containers/RepoPage'

export default class Root extends React.Component {
    render() {
        return (
            <Router >
                <Route path="/" component={App} />
            </Router>
                )
    }
}

