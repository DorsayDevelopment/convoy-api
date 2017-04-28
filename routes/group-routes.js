const controller = require('../controllers/groupsController');
const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router({
  prefix: '/groups'
});

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', async ctx => {
  ctx.body = await controller.getGroups();
});

router.get('/:id', async ctx => {
  ctx.body = 'Get group by Id';
});

router.post('/', async ctx => {
  ctx.body = await controller.createGroup(ctx.request.body);
});

module.exports = router.routes();