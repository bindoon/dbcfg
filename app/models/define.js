var Sequelize = require("sequelize");
var dbHelper = require('./dbHelper');

module.exports = function (sequelize) {
    var DbCfg = dbHelper.createDefine(sequelize,'t_dbcfg', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dialect: {
            type: Sequelize.STRING,
            defaultValue: 'mysql',
            allowNull: false
        },
        host: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        port: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        dbname: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    //var DbCfg = sequelize.define('t_dbcfg', {
    //        id: {
    //            type: Sequelize.INTEGER(11).UNSIGNED,
    //            allowNull: false,
    //            primaryKey: true,
    //            autoIncrement: true
    //        },
    //            type:  Sequelize.INTEGER(11),
    //    host: Sequelize.STRING,
    //    username:  Sequelize.STRING,
    //    password: Sequelize.STRING,
    //    port: Sequelize.INTEGER(11),
    //    dbname:  Sequelize.STRING,
    //});
    //Dbcfg.__factory = {autoIncrementField: 'id'}

    var TableCfg = dbHelper.createDefine(sequelize,'t_tablecfg', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dbid: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        tname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    var ColumnCfg = dbHelper.createDefine(sequelize,'t_columncfg', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tableid: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        cname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        cfg: Sequelize.TEXT
    });

    return {
        DbCfg : DbCfg,
        TableCfg : TableCfg,
        ColumnCfg : ColumnCfg,
        sequelize:sequelize
    }

}
