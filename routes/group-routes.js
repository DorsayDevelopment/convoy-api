const controller = require('../controllers/groupsController');
const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router({
  prefix: '/groups'
});

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async ctx => {
  ctx.body = await controller.getGroups(ctx.state.user.id);
});

router.get('/:id', async ctx => {
  ctx.body = await controller.getGroupById(ctx.params.id, ctx.state.user.id);
});

router.post('/', async ctx => {
  ctx.body = await controller.createGroup(ctx.request.body, ctx.state.user.id);
});

router.post('/:groupId/members/:userId', async ctx => {
  ctx.body = await controller.addMember(ctx.params.groupId, ctx.params.groupId, ctx.state.user.id);
});

module.exports = router.routes();