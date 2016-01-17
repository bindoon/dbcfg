import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteHandler } from 'react-router'
import { Col,Row } from 'antd';


import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

import Sider from './sider'
let App = React.createClass({
    render() {
        return (
        <Row>
                <Sider />
            <Col span="18">
                <Counter {...this.props}  />
                </Col>
        </Row>
        )
    }
})

export default connect(state => ({
    mycounter: state.counter
}), dispatch =>({
    action:bindActionCreators(CounterActions, dispatch)
}))(App)
