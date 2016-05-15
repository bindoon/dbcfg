
var Sequelize = require("sequelize");



var dbHelper = {
    findOne: function* (model, conditon) {
        return yield model.findOne(conditon);
    },
    findAll : function * (model, conditon) {
        return yield model.findAll(conditon);
    },
    querylimit : function(model, conditon) {
        return new Promise(function(resolve, reject) {
            model.find(conditon).skip(20).limit(20).toArray( function(error, data) {
                if (error)
                    reject(error);
                resolve(data);
            })
        })
    },
    insert : function* (model, doc) {
        return yield model.create(doc);
    },
    upsert: function* (model, update) {
        return yield  model.upsert(update)
    },
    findOneAndUpdate: function(model, conditions, update, options) {
        return new Promise(function(resolve, reject) {
            model.findOneAndUpdate(conditions,update,options,function(error) {
                if (error){
                    reject(error);
                    console.log(error);
                }
                resolve();
            })
        })
    },
    remove : function* (model, conditions) {
        return  yield model.destroy(conditions);
    },

    createConnect : function(config) {
        //config = Object.assign({},config);

        delete config.id;
        delete config.createdAt;
        delete config.updatedAt;

        return new Sequelize(config.dbname, config.username, config.password, config);
    },
    createDefine : function(sequelize, tbname, columnArr){
        var columns = {};
        if(columnArr.length) {
            for(var i =0; i< columnArr.length; i++) {
                var column = columnArr[i].dataValues;
                if(column.type == 0) {
                    columns[column.cname] = {
                        type: Sequelize.INTEGER(11).UNSIGNED,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true
                    }
                } else if (column.type == 10) {
                    continue;
                } else {
                    columns[column.cname] = {
                        type: Sequelize.STRING,
                        allowNull: false
                    }
                }
            }
        } else
            columns = columnArr;

        //console.log(columns)

        return sequelize.define(tbname,columns, {
            tableName: tbname
        });
    }

}

module.exports = dbHelper;
