const locationsController = require('../controllers/locationsController');
const Router = require('koa-router');
const router = new Router({
  prefix: '/locations'
});

router.get('/', async ctx => {
  ctx.body = 'Get locations'
});

router.get('/:id', async ctx => {
  ctx.body = 'Get location by Id'
});

router.post('/', async ctx => {
  ctx.body = 'Create location. This will probably need to be handled differently depending on the technology used to send location updates.';
});

module.exports = router.middleware();