import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteHandler } from 'react-router'


import List from '../components/list'
import * as Actions from '../actions/index'

import {Input} from '@ali/sui'

let App = React.createClass({

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.getList());
    },
    _columns (columns) {
        let arr = [];
        columns.forEach((item,idx) => {
            arr.push({title:item.mapname,dataIndex:item.name})
        })
        return arr;
    },
    _pagination(pagination) {
        return pagination? {
            total:pagination.totalItems,
            current:pagination.currentPage,
            onShowSizeChange: function(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function(current) {
                console.log('Current: ', current);
            }
        }:{}
    },

    render() {
        var {columns,list, pagination, ...others} = this.props.result;

        return (
                <List {...others} dataSource={list} columns={this._columns(columns)} pagination={this._pagination(pagination)} />
        )
    }
})

export default connect(state => ({
    result: state.list.result
}))(App)
