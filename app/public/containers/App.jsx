import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import List from '../components/list'
import * as Actions from '../actions/index'

import {Input,notification} from 'antd'

class App extends React.Component {
    constructor() {
        super(...arguments);
        let condition = Object.assign({},this.props.location.query);
        this.state = {
            condition
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        Actions.setId(this.props.params.id);
        dispatch(Actions.getData({condition:this.state.condition}));
    }
    showMessage(json) {
        if(json.success) {
            notification.success({
                message:json.message
            })
        } else {
            notification.error({
                message:json.message,
                description:json.description
            })
        }
    }

    componentWillReceiveProps (next) {

        if(next.params.id != this.props.params.id || next.location.query!=this.props.location.query) {
            const { dispatch } = this.props;
            if(next.params.id != this.props.params.id) {
                Actions.setId(next.params.id);
            }
            if(next.location.query!=this.props.location.query) {
                this.setState({
                    condition:next.location.query
                })
            }
            dispatch(Actions.getData({condition:next.location.query}));
        }
    }
    _columns (columns) {
        let arr = [];
        columns.forEach((item,idx) => {
            arr.push({title:item.title,dataIndex:item.cname,type:item.type,cfg:item.cfg})
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
        }:{};
    }
    onAdd(data) {
        const { dispatch } = this.props;
        dispatch(Actions.addData(data)).then(json=>this.showMessage(json));
    }
    onUpdate(data) {
        const { dispatch } = this.props;
        dispatch(Actions.updateData(data)).then(json=>this.showMessage(json));
    }
    onDelete(data) {
        const { dispatch } = this.props;
        dispatch(Actions.deleteData(data)).then(json=>this.showMessage(json));
    }
    onSearch(condition) {
        const { dispatch } = this.props;
        dispatch(Actions.getData({condition:Object.assign({},this.state.condition,condition)}));
    }
    render() {
        let {columns,data, pagination, ...others} = this.props.list;
        return  <List {...others} dataSource={data} columns={this._columns(columns)} rowKey={(record)=>{return record.id}} pagination={this._pagination(pagination)} onAdd={this.onAdd.bind(this)} onUpdate={this.onUpdate.bind(this)} onSearch={this.onSearch.bind(this)} onDelete={this.onDelete.bind(this)}/>
    }
}


export default connect(state => ({
    list: state.list,
}))(App)
