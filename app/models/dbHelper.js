
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
    insert : function(model, doc) {
        return new Promise(function(resolve, reject) {
            model.create(doc,function(error,data) {
                if (error)
                    reject(error);
                resolve(data);
            })
        })
    },
    update: function(model, conditions, update, options) {
        return new Promise(function(resolve, reject) {
            model.update(conditions,update,options,function(error) {
                if (error)
                    reject(error);
                resolve();
            })
        })
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
    remove : function(model, conditions) {
        return new Promise(function(resolve, reject) {
            model.remove(conditions,function(error) {
                if (error)
                    reject(error);
                resolve();
            })
        })
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
                if(column.cname === 'id') {
                    columns[column.cname] = {
                        type: Sequelize.INTEGER(11).UNSIGNED,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true
                    }
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
