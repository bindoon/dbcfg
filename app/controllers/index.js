'use strict';

const helper = require('../lib/helper');

let homeController = {

    index : function *(next) {
        yield this.render('index', { title: 'Express',static:config.get('global.static') });
    }
};

module.exports = helper.wrapControllerByTryCatch(homeController);

