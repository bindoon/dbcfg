'use strict';

const helper = require('../lib/helper');
var config = require('config');

let homeController = {

    index : function *(next) {
        yield this.render('index', { title: 'Express',static:config.global.static });
    }
};

module.exports = helper.wrapControllerByTryCatch(homeController);

