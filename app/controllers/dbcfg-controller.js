'strict model';

var co = require('co');
var dbHelper = require('../models/dbHelper');
var jsonprc = require('../biz/jsonprc')
var db = require('../models');
var dbStore = require('../biz/dbStore')
var mongoose = require('mongoose');

function getKey(kv) {
    var keyMap = {};
    for(var name in kv) {
        keyMap[name]=kv[name];
    }
    return keyMap;
}

function getColumnKV(kv,columnMapArr) {
    for(var i=0; i< columnMapArr.length; i++) {
        var column = columnMapArr[i].column;
        if(column in kv) {
            kv[column].mapname = columnMapArr[i].mapname;
            kv[column].ctype = columnMapArr[i].ctype;
            kv[column].config = columnMapArr[i].config;
        }
    }
    var key = [];
    for(var name in kv) {
        if (name == '__v' || name == '_id') {
            continue;
        };

        var configValue = [];
        if (kv[name].config&&kv[name].config.value) {
            configValue = kv[name].config.value;
        };

        // var configobj = kv[name].config;
        // if (kv[name].ctype==2&&configobj.value&&configobj.value.length) {
        //     for (var i = 0; i < configobj.value.length; i++) {
        //         var vn = configobj.value[i].split('|');
        //         if (vn.length===2) {
        //             configValue.push({
        //                 v:vn[0],
        //                 n:vn[1]
        //             })
        //         };
        //     };
        // };

        key.push({
            name: name,
            type:kv[name].instance,
            mapname: kv[name].mapname||name,
            ctype:kv[name].ctype,
            config: kv[name].config? JSON.stringify(kv[name].config):'',
            configValue: configValue
        });
    }
    return key;
}

var tableMap = getKey(mongoose.modelSchemas);

function* queryData(usermodel,condition, options) {
    return  yield dbHelper.query(usermodel, condition, options);
}

function* updateData(usermodel,list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.findOneAndUpdate(usermodel,{_id:obj_id}, list[i], {});
    };
    return  0;
}

function* removeData(usermodel,list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.remove(usermodel,{_id:obj_id});
    };
    return  0;
}

function* getColumnMap(usermodel, tablename) {
    return yield dbHelper.query(usermodel,{table:tablename});
}

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

exports.dbcfg = function(req, res, next) {
    var param = req.getParams();

    if (!param.id||!param.op) {
        res.send(jsonprc.error('param error'));
        return;
    };

    var respone = {
        success:true
    };

    co(function* (){
        switch(param.op) {
            case 'query':
            {
                var condition = param.condition? JSON.parse(param.condition):{};
                var pagination = param.pagination? JSON.parse(param.pagination):{};


                var ColumnCfg = yield dbHelper.findAll(db.ColCfg,{where:{tbid:param.id}});
                var tbdefine = yield getTable(param.id,ColumnCfg);
                var data = yield dbHelper.findAll(tbdefine,{where:condition});  //查询数据

                respone.result = {
                    columns: ColumnCfg,
                    condition: condition,
                    pagination: pagination,
                    data: data
                }

                if (data.length >= 0) {
                    return respone;
                } else {
                    return jsonprc.error('query error');
                }
                break;
            }
            case 'insert':
            {
                var data = param.data? JSON.parse(param.data):[];
                var tbdefine = yield getTable(param.id,ColumnCfg);
                for (var i = 0; i < data.length; i++) {
                    yield dbHelper.insert(tbdefine, data[i]);
                };
                respone.result = {
                    code: 0,
                    msg: '添加成功'
                }
                return respone;
                break;
            }
            case 'update':
            {
                var data = param.data? JSON.parse(param.data):[];
                var tbdefine = yield getTable(param.id,ColumnCfg);
                for (var i = 0; i < data.length; i++) {
                    yield dbHelper.upsert(tbdefine, data[i]);
                };
                respone.result = {
                    code: 0,
                    msg: '更新成功'
                }
                return respone;
                break;
            }
            case 'delete':
            {
                var list = param.list? JSON.parse(param.list):[];
                yield removeData(usermodel,list);
                respone.result = {
                    code: 0,
                    msg: '删除成功'
                }
                return respone;
                break;
            }
        }
    }).then(function(ret){

        if (param.callback) {
            res.send(param.callback+'('+JSON.stringify(ret)+')');
            return;
        };
        res.send(ret);
    })
}
