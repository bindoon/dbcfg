"use strict";

var dbHelper = require('./dbHelper');
var Sequelize = require("sequelize");
var config = require('config');
var sequelize = dbHelper.createConnect({dbname:config.DATABASE, username:config.USERNAME, password:config.PASSWORD});

module.exports = require('./define')(sequelize);
