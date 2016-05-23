'strict model';

var app = require('koa')()
    , koa = require('koa-router')()
    , logger = require('koa-logger')
    , json = require('koa-json')
    , views = require('koa-views')
    , xtpl = require('xtpl/lib/koa')
    , path = require('path')
    , fs = require('fs')
    , onerror = require('koa-onerror');

var extend = require('util')._extend;

global.db = require('./app/models');
global.config = require('config');
console.log(config)
const routers = require('./app/routers');

//xtemplate模板渲染
xtpl(app,{
    //配置模板目录，指向工程的view目录
    views: __dirname + '/app/views'
});

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){

    this.response.set("Access-Control-Allow-Origin","*");
    this.response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    var params = this.query;
    params = extend(params,this.request.body);
    this.getParam = function (key) {
        return params[key];
    }
    this.getParams = function() {
        return params;
    }

    var start = new Date;
    yield next;

    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});


app.use(require('koa-static')(__dirname + '/app/public'));

// // routes definition
koa.use('', routers.routes(), routers.allowedMethods());
// koa.use('/users', users.routes(), users.allowedMethods());

// // mount root routes
app.use(koa.routes());

app.on('error', function(err, ctx){
    logger.error('server error', err, ctx);
});

module.exports = app;
