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
            type: Sequelize.STRING,
            allowNull: true
        },
        dbname: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    var TbCfg = dbHelper.createDefine(sequelize,'t_tbcfg', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dbid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    var ColCfg = dbHelper.createDefine(sequelize,'t_colcfg', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tbid: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
            allowNull: false
        },
        cfg: Sequelize.TEXT
    });

    var Menu = dbHelper.createDefine(sequelize,'t_menu', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        link: {
            type: Sequelize.STRING,
            allowNull: false
        },
        target: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        parentid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        corder: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return {
        DbCfg : DbCfg,
        TbCfg : TbCfg,
        ColCfg : ColCfg,
        Menu: Menu
    }

}
