import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteHandler } from 'react-router'


import List from '../components/list'
import * as Actions from '../actions/index'

import {Input,message} from '@ali/sui'

class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.getList());
    }

    componentDidUpdate(){
        if(this.props.list.msg.mtype) {
            message.success(this.props.list.msg.text);
        }
    }
    _columns (columns) {
        let arr = [];
        columns.forEach((item,idx) => {
            arr.push({title:item.mapname,dataIndex:item.name})
        })
        return arr;
    }
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
    }
    onAdd(list) {
        const { dispatch } = this.props;
        dispatch(Actions.addList(list));
    }
    onUpdate(list) {
        const { dispatch } = this.props;
        dispatch(Actions.updateList(list));
    }
    onDelete(list) {
        const { dispatch } = this.props;
        dispatch(Actions.deleteList(list));
    }
    onSearch(condition) {
        const { dispatch } = this.props;
        dispatch(Actions.getList(condition));
    }
    render() {
        let {columns,data, pagination, ...others} = this.props.list.result;
        return  <List {...others} dataSource={data} columns={this._columns(columns)} pagination={this._pagination(pagination)} onAdd={this.onAdd.bind(this)} onUpdate={this.onUpdate.bind(this)} onSearch={this.onSearch.bind(this)} onDelete={this.onDelete.bind(this)}/>
    }
}

export default connect(state => ({
    list: state.list,
}))(App)
