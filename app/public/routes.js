import React from 'react'
import {Router, Route,IndexRoute, NotFoundRoute} from 'react-router'


import Container from './containers/index';
import App from './containers/App'

const routes = (
    <Router path="/" component={Container}>
        <IndexRoute component={App}/>

    </Router>
);

export default routes;
