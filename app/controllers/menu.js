'use strict';

var dbHelper = require('../models/dbHelper');
var jsonprc = require('../biz/jsonprc')
var BSON = require('bson').BSONPure;
var helper = require('../lib/helper');

var util = require('util');

var Menu = require('../models').Menu;



function createTree(list) {
    var map = {};
    for (var i = 0; i < list.length; i++) {

        var item = Object.assign({}, list[i].dataValues); //不这么改，扩展不了。不知道是怎么做到的约束
        item.items = [];
        map[item.id] = item;
    };

    var result = [];

    for (var i in map) {
        if (map[i].parentid == 0) {
            result.push(map[i]);
        } else if (map[i].parentid in map) {
            map[map[i].parentid].items.push(map[i]);
        }
    }

    return result.sort(function(a, b) {
        return a.order > b.order;
    });
}



function* queryData(usermodel, condition, options) {
    return yield dbHelper.query(usermodel, condition, options);
}

function* insertData(usermodel, list) {
    for (var i = 0; i < list.length; i++) {
        yield dbHelper.insert(usermodel, list[i]);
    };
    return 0;
}

function* updateData(usermodel, list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.findOneAndUpdate(usermodel, {
            _id: obj_id
        }, list[i], {});
    };
    return 0;
}

function* removeData(usermodel, list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.remove(usermodel, {
            _id: obj_id
        });
    };
    return 0;
}

var menuController = {

    menu : function * (next) {

        var list = yield dbHelper.findAll(Menu, {});
        this.body = {
            result: {
                list: createTree(list)
            }
        }
    },
    menucfg : function * (next) {
        var op = this.getParam('op');
        if (op == 'update') {
            var list = this.getParam('data');
            list = list ? JSON.parse(list) : [];

            for (var i = 0; i < list.length; i++) {
                if (list[i].action == 'create') {
                    yield dbHelper.insert(Menu, list[i]);

                } else if (list[i].action == 'update') {

                    var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
                    yield dbHelper.findOneAndUpdate(Menu, {
                        _id: obj_id
                    }, list[i], {});
                } else if (list[i].action == 'delete') {
                    var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
                    yield dbHelper.remove(Menu, {
                        _id: obj_id
                    });
                }
            };

            this.body = {
                code: 0,
                message: 'success'
            }

        } else {
            var list = yield dbHelper.findAll(Menu, {});
            this.body = {
                result: {
                    list: createTree(list)
                }
            } ;
        }
    }


}

module.exports = helper.wrapControllerByTryCatch(menuController);
