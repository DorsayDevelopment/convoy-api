const locationsController = require('../controllers/locationsController');
const Router = require('koa-router');
const router = new Router({
  prefix: '/groups'
});

router.get('/', async ctx => {
  ctx.body = 'Get groups'
});

router.get('/:id', async ctx => {
  ctx.body = 'Get group by Id'
});

router.post('/', async ctx => {
  ctx.body = 'Create group.';
});

module.exports = router.middleware();