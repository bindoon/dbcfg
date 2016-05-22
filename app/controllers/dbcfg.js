'strict model';

var dbHelper = require('../models/dbHelper');
var jsonprc = require('../biz/jsonprc')
var db = require('../models');
var dbStore = require('../biz/dbStore')
var helper = require('../lib/helper');

function* getTable(id,ColumnCfg) {
    ColumnCfg = ColumnCfg || (yield dbHelper.findAll(db.ColCfg,{where:{tbid:id}}));
    var TbCfg = yield dbHelper.findOne(db.TbCfg,{where:{id:id}});

    var dbconnect;
    if(TbCfg.dbid in dbStore.dbStore) {
        dbconnect = dbStore.dbStore[DbCfg.id];
    }
    else {
        var DbCfg = yield  dbHelper.findOne(db.DbCfg,{where:{id:TbCfg.dbid}});

        dbconnect = dbHelper.createConnect(DbCfg.dataValues);   //获取db链接
        dbStore.dbStore[DbCfg.id] = dbconnect;
    }

    return dbHelper.createDefine(dbconnect, TbCfg.tname, ColumnCfg) //定义table
}

// 插入删除自增、label字段
function opInsert(columnArr,data) {
    for(var i =0; i< columnArr.length; i++) {
        var column = columnArr[i].dataValues;
        /*0:自增id  1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker  9:隐藏 */

        switch (column.type) {
            case 0:
            case 6:
            delete data[column.cname];
        }
    }

    return data;
}

function opDelete(columnArr,data) {
    var obj = data;
    for(var i =0; i< columnArr.length; i++) {
        var column = columnArr[i].dataValues;
        /*0:自增id  1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker  9:隐藏 */

        switch (column.type) {
            case 0:
                obj = {};
                obj[column.cname] = data[column.cname];
        }
    }

    return obj;
}

var dbcfgController = {


    dbcfg : function *(next) {

        var param = this.getParams();
        if (!param.id||!param.op) {
            this.body = jsonprc.error('param error');
            return;
        };

        var respone = {
            success:true
        };

        var ColumnCfg = yield dbHelper.findAll(db.ColCfg,{where:{tbid:param.id}, raw: true});

        switch(param.op) {
            case 'query':
            {
                var condition = param.condition? JSON.parse(param.condition):{};
                var pagination = param.pagination? JSON.parse(param.pagination):{};

                var tbdefine = yield getTable(param.id,ColumnCfg);
                var data = yield dbHelper.findAll(tbdefine,{where:condition});  //查询数据

                //关联查询
                if(ColumnCfg.length) {
                    for (var i = 0; i < ColumnCfg.length; i++) {
                        var column = ColumnCfg[i];
                        if (column.type == 2 && column.cfg) {
                            try{
                                var cfg = JSON.parse(column.cfg);
                                if(typeof cfg.id !== undefined) {

                                    var ColumnCfgSub = yield dbHelper.findAll(db.ColCfg,{where:{tbid:cfg.id+''}});
                                    var tbdefineSub = yield getTable(cfg.id,ColumnCfgSub);
                                    var dataSub = yield dbHelper.findAll(tbdefineSub,{raw:true});
                                    var cfgarr = [];
                                    if (dataSub.length) {
                                        for (var j = 0; j < dataSub.length; j++) {
                                            var subItem = dataSub[j];
                                            console.log(subItem)
                                            cfgarr.push([subItem[cfg.key],subItem[cfg.value]]);

                                        }
                                        column.cfg = JSON.stringify(cfgarr);
                                    }

                                }
                            } catch(e) {
                                console.log(e)
                            }

                        }
                    }
                }

                respone.result = {
                    columns: ColumnCfg,
                    condition: condition,
                    pagination: pagination,
                    data: data
                }

                if (data.length >= 0) {
                    this.body =  respone;
                } else {
                    this.body = jsonprc.error('query error');
                }
                break;
            }
            case 'insert':
            {
                var data = param.data? JSON.parse(param.data):[];
                var tbdefine = yield getTable(param.id,ColumnCfg);
                for (var i = 0; i < data.length; i++) {
                    for(j in data[i]) {
                        data[i][j] = data[i][j]+'';
                    }
                    yield dbHelper.insert(tbdefine, opInsert(ColumnCfg,data[i]));
                };
                respone.result = {
                    code: 0,
                    msg: '添加成功'
                }
                this.body = respone;
                break;
            }
            case 'update':
            {
                var data = param.data? JSON.parse(param.data):[];
                var tbdefine = yield getTable(param.id,ColumnCfg);
                for (var i = 0; i < data.length; i++) {
                    //tbdefine.upsert(data[i]).then(function(err){console.log(err)})
                    for(j in data[i]) {
                        data[i][j] = data[i][j]+'';
                    }
                    yield dbHelper.upsert(tbdefine, data[i]);
                };
                respone.result = {
                    code: 0,
                    msg: '更新成功'
                }
                this.body = respone;
                break;
            }
            case 'delete':
            {
                var data = param.data? JSON.parse(param.data):[];
                var tbdefine = yield getTable(param.id,ColumnCfg);
                for (var i = 0; i < data.length; i++) {
                    //tbdefine.upsert(data[i]).then(function(err){console.log(err)})
                    yield dbHelper.remove(tbdefine, {where:opDelete(ColumnCfg, data[i]),limit:1});
                };
                respone.result = {
                    code: 0,
                    msg: '删除成功'
                }
                this.body = respone;
                break;
            }
        }
    }
}
module.exports = helper.wrapControllerByTryCatch(dbcfgController);
