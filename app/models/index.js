"use strict";

var dbHelper = require('./dbHelper');
var Sequelize = require("sequelize");

var sequelize = dbHelper.createConnect({dbname:'dbcfg', username:'root', password:''});

module.exports = require('./define')(sequelize);
