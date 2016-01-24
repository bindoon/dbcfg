'use strict';

var React = require('react');

import { Table,Button } from '@ali/sui';
import {Input} from '@ali/sui'


// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  onChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ' + selectedRowKeys);
  },
  onSelect: function(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: function(selected, selectedRows) {
    console.log(selected, selectedRows);
  }
};

const addRowSelection = {
    getCheckboxProps: function(record) {
        return {
            defaultChecked: true
        }
    },
    onChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ' + selectedRowKeys);
    },
    onSelect: function(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: function(selected, selectedRows) {
        console.log(selected, selectedRows);
    }
};

export default React.createClass( {

    getInitialState(){
      return {
          addNum:3,
          addShow: false,
          data:{
              list:[],
              newList:[]
          }
      }
    },
    propTypes : {
      columns: React.PropTypes.array,
      condition: React.PropTypes.object,
      dataSource: React.PropTypes.array,
      pagination: React.PropTypes.object,
      addNum: React.PropTypes.number,
    },
    componentWillReceiveProps (next) {
        this.setState({
            data:{
                list:next.dataSource,
                newList:this._initAddColumn(next.columns,3)
            },
        });
    },

    listColumns(columns,keyname) {
        var newColumns = Object.assign([],columns);

        newColumns.forEach((item)=>{
            item.render=(value,record,idx)=>{
                return <Input defaultValue={value} onChange={(e)=>{
                    record[item.dataIndex]=e.target.value;
                    var newData = this.state.data;
                    console.log(newData,record,idx)
                    newData[keyname][idx]=record;
                    this.setState({
                        data:newData
                    })
                }} ></Input>;
            }
        })
        return newColumns;

    },

    _initAddColumn (columns, num) {
        var additem = {};
        columns.forEach(item=>{
            additem[item['dataIndex']]="";
        })
        var addlist=[];
        for(let i=0;i<num;i++) {
            addlist.push(additem);
        }
        return addlist;
    },
    onAddData() {
        this.setState({
            addShow:true
        })
    },
    onCancelAddData() {
        this.setState({
            addShow:false
        })
    },
    onUpdate(){
        console.log(this.state.data.list[0])
    },
    render() {
        let {columns,condition,dataSource,pagination,addNum} = this.props;

        addNum = addNum || this.state.addNum;

        return <div style={{padding:'10px 10px',background:'#fff'}}>
                <div style={{margin:'10px 0'}} >
                    <Button type="link" onClick={this.onAddData}>新增数据</Button>
                    <Button type="link" onClick={this.onUpdate}>批量更新</Button>
                    <Button type="link">批量删除</Button>
                </div>

                <Table  rowSelection={rowSelection} columns={this.listColumns(columns,'list')} dataSource={dataSource} bordered />

                <div >
                    <Button type="link" onClick={this.onAddData}>新增数据</Button>
                    <Button type="link" onClick={this.onUpdate}>批量更新</Button>
                    <Button type="link">批量删除</Button>
                </div>

                {this.state.addShow? (<div>
                    <Table  rowSelection={addRowSelection} columns={this.listColumns(columns,'newList')} dataSource={this._initAddColumn(columns,addNum)} pagination={false} bordered />
                    <Button type="primary">提交</Button>
                    <Button style={{marginLeft:"10px"}}  onClick={this.onCancelAddData}>取消</Button>
                </div>):null}

            </div>

    }
})

