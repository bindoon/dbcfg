'use strict';

import React from 'react';
import _ from 'lodash';

import {Input,Form, Row, Col,Table,Button,Modal,Select,Checkbox,DatePicker } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;


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
    onChange(item,record,e) {
        record[item.dataIndex]=e.target.value;
        let state = Object.assign({},this.state);
        this.setState(state)
    }
    handleSelectChange(item,record,value) {
        record[item.dataIndex]=value;
        let state = Object.assign({},this.state);
        this.setState(state)
    }
    listColumns(columns, type='list') {
        var newColumns =  _.cloneDeep(columns);

        newColumns.forEach((item)=>{
            item.render=(value,record,idx)=>{
                /* 0:自增id 1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker 9:隐藏 */

                let container = <Input value={value} onChange={this.onChange.bind(this,item,record)} ></Input>;
                switch (item.type) {
                    case 2: //select
                    {
                        let options = [];
                        if(item.cfg) {
                            try{
                                options = JSON.parse(item.cfg);
                            }catch(e) {
                                options = []
                            }
                        }
                        container = <Select value={value} onChange={this.handleSelectChange.bind(this,item,record)} style={{ width: 100 }}>
                            { options.map( (v)=>{
                                return <Option value={v[0]}>{v[1]}</Option>
                            }) }
                        </Select>;
                    }
                        break;
                    case 3:
                        container = <Input type="textarea" value={value} onChange={this.onChange.bind(this,item,record)} />
                        break;
                    case 6:
                    case 0:
                        container = type === 'add'? <label>自动值</label>:<label>{value}</label>;
                        break;
                    case 7:
                        container = <Checkbox />
                        break;
                    case 8:
                        container = <DatePicker defaultValue={value} />
                        break;

                }
                return container;
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
                    break;
                }
            }
        })
        this.props.onAdd && this.props.onAdd(list);
        this.onCancelAdd();
    }
    onUpdate(){
        let list = this.state.selectedRowKeys.map((i)=>{
            return this.state.list[i];
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
        let {columns,pagination,addNum,rowKey} = this.props;
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
                        return   (<FormItem key={item.dataIndex}
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

                <Table  rowSelection={rowSelection} columns={this.listColumns(columns)}  dataSource={this.state.list} loading={this.state.loading} bordered striped />

                <div >
                    <Button type="link" onClick={this.onAddColumn.bind(this)}>新增数据</Button>
                    <Button type="link" onClick={this.onUpdate.bind(this)}>批量更新</Button>
                    <Button type="link" onClick={this.onDelete.bind(this)}>批量删除</Button>
                </div>

                {this.state.addShow? (<div>
                    <Table  rowSelection={addRowSelection} columns={this.listColumns(columns,'add')} dataSource={this.state.newList} pagination={false} bordered striped />
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
