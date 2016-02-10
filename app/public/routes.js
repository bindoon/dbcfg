import React from 'react'
import {Router, Route,IndexRoute, NotFoundRoute} from 'react-router'


import Layout from './containers/layout';
import App from './containers/App'

const routes = (
    <Router path="/" component={Layout}>
        <IndexRoute component={App}/>
        <Route path="/list/:id" component={App} />
    </Router>
);

export default routes;
