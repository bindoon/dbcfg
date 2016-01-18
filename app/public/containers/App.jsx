import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteHandler } from 'react-router'


import List from '../components/list'
import * as Actions from '../actions/index'

let App = React.createClass({
    render() {
        return (
                <List {...this.props}  />
        )
    }
})

export default connect(state => ({
}), dispatch =>({
    action:bindActionCreators(Actions, dispatch)
}))(App)
