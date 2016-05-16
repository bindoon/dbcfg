'strict model';

var router = require('koa-router')();

var dbcfg = require('./controllers/dbcfg')
var index = require('./controllers/index')
var menu = require('./controllers/menu')


/* GET home page. */
router.get('/', index.index);

router.get('/api/dbcfg',dbcfg.dbcfg);
router.post('/api/dbcfg',dbcfg.dbcfg);

router.get('/api/menu',menu.menu);
router.get('/api/menucfg', menu.menucfg);
router.post('/api/menucfg', menu.menucfg);

module.exports = router;
