'use strict';

const helper = require('../lib/helper');

let homeController = {

    index : function *(next) {
        console.log(config)
        yield this.render('index', { title: 'Express',static:config.get('global.static') });
    }
};

module.exports = helper.wrapControllerByTryCatch(homeController);

