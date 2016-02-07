'use strict';

var React = require('react');

import {Input,Form, Row, Col,Table,Button,Modal } from '@ali/sui'
const FormItem = Form.Item;
const confirm = Modal.confirm;

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addShow: false,
            loading: false,
            selectedRowKeys:[],
            addNewSelectedRowKeys:[],
            list:[],
            newList:[],
            condition:{},
        }
    }
    componentWillReceiveProps (next) {
        var addNewSelectedRowKeys = [];
        for(let i=0; i< next.addNum; i++) {
            addNewSelectedRowKeys.push(i);
        }
        this.setState({
            list:next.dataSource,
            newList:this._initAddColumn(next.columns,next.addNum),
            condition:next.condition||{},
            loading: false,
            addNewSelectedRowKeys
        });
    }
    listColumns(columns) {
        var newColumns = Object.assign([],columns);

        newColumns.forEach((item)=>{
            item.render=(value,record,idx)=>{
                return <Input value={value} onChange={(e)=>{
                    record[item.dataIndex]=e.target.value;
                    let state = Object.assign({},this.state);
                    this.setState(state)
                }} ></Input>;
            }
        })
        return newColumns;
    }

    _initAddColumn (columns, num) {
        var additem = {};
        columns.forEach(item=>{
            additem[item['dataIndex']]="";
        })
        var addlist=[];
        for(let i=0;i<num;i++) {
            addlist.push(Object.assign({},additem));
        }

        return addlist;
    }
    _searchOnChange(dataIndex,e) {
        let condition = this.state.condition;
        if(e.target.value !== '') {
            condition[dataIndex]=e.target.value;

        } else {
            delete condition[dataIndex];
        }

        this.setState({
            condition
        })
    }

    onSearch(){
        this.setState({
            loading: true
        })
        this.props.onSearch && this.props.onSearch(this.state.condition);
    }
    onClearSearch() {
        this.setState({
            condition:{}
        })
    }
    onAddColumn() {
        this.setState({
            addShow:true
        })
    }
    onCancelAdd() {
        this.setState({
            addShow:false
        })
    }
    onAdd() {
        let list = [];
        this.state.addNewSelectedRowKeys.forEach((i)=>{
            for(let item in this.state.newList[i]) {
                //去除没有数据的
                if(this.state.newList[i][item]) {
                    list.push( this.state.newList[i]);
                }
            }
        })
        this.props.onAdd && this.props.onAdd(list);
        this.onCancelAdd();
    }
    onUpdate(){
        let list = this.state.selectedRowKeys.map((i)=>{
            return this.props.dataSource[i];
        })
        this.props.onUpdate && this.props.onUpdate(list);
    }
    onDelete() {
        let list = this.state.selectedRowKeys.map((i)=>{
            return this.props.dataSource[i];
        })

        if(list.length>0) {
            confirm({
                title: '是否确认删除所选内容',
                onOk:() => {
                    this.props.onDelete && this.props.onDelete(list);
                },
                onCancel: function() {}
            });
        }
    }
    render() {
        let {columns,pagination,addNum} = this.props;
        let condition = this.state.condition;

        const rowSelection = {
            onChange: ((selectedRowKeys) => {
                this.setState({selectedRowKeys});
            }).bind(this)
        };
        const addRowSelection = {
            getCheckboxProps: function(record) {
                return {
                    defaultChecked: true
                }
            },
            onChange:((addNewSelectedRowKeys) => {
                this.setState({addNewSelectedRowKeys});
            }).bind(this)
        };

        return <div style={{padding:'10px 10px',background:'#fff'}}>
                <Form inline>
                    <div>
                    {columns.map((item)=>{
                        return   (<FormItem
                        label={item.title}>
                        <Input placeholder="请输入搜索名称" value={condition[item.dataIndex]} onChange={this._searchOnChange.bind(this,item.dataIndex)}/>
                        </FormItem>)
                    })}
                    </div>
                    <div>
                    <Button type="primary" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button style={{marginLeft:'10px'}} onClick={this.onClearSearch.bind(this)}>清除条件</Button>
                    </div>
                </Form>

                <div style={{margin:'10px 0'}} >
                    <Button type="link" onClick={this.onAddColumn.bind(this)}>新增数据</Button>
                    <Button type="link" onClick={this.onUpdate.bind(this)}>批量更新</Button>
                    <Button type="link" onClick={this.onDelete.bind(this)}>批量删除</Button>
                </div>

                <Table  rowSelection={rowSelection} columns={this.listColumns(columns)} dataSource={this.state.list} loading={this.state.loading} bordered striped />

                <div >
                    <Button type="link" onClick={this.onAddColumn.bind(this)}>新增数据</Button>
                    <Button type="link" onClick={this.onUpdate.bind(this)}>批量更新</Button>
                    <Button type="link" onClick={this.onDelete.bind(this)}>批量删除</Button>
                </div>

                {this.state.addShow? (<div>
                    <Table  rowSelection={addRowSelection} columns={this.listColumns(columns)} dataSource={this.state.newList} pagination={false} bordered striped />
                    <div style={{margin:'10px 2px'}}>
                        <Button type="primary" onClick={this.onAdd.bind(this)}>提交</Button>
                        <Button style={{marginLeft:"10px"}}  onClick={this.onCancelAdd.bind(this)}>取消</Button>
                    </div>

                </div>):null}

            </div>
    }
}


List.propTypes = {
    columns: React.PropTypes.array,
    condition: React.PropTypes.object,
    dataSource: React.PropTypes.array,
    pagination: React.PropTypes.object,
}

export default  List;
