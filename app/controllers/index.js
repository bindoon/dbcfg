'use strict';

const helper = require('../lib/helper');
let homeController = {

    index : function *(next) {
        yield this.render('index', { title: 'Express' });
    }
};

module.exports = helper.wrapControllerByTryCatch(homeController);

