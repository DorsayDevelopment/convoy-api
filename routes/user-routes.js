const usersController = require('../controllers/usersController');
const Router = require('koa-router');
const passport = require('koa-passport')
const router = new Router({
  prefix: '/users'
});

router.get('/', async ctx => {
  ctx.body = await usersController.getUsers();
});

router.use('/test', passport.authenticate('jwt', { session: false }));

router.get('/test', async ctx => {
  ctx.body = ctx.state.user;
});

router.get('/:id', async ctx => {
  ctx.body = await usersController.getUserById(ctx.params.id);
});

router.post('/', async ctx => {
  ctx.body = await usersController.createUser(ctx.request.body);
});

module.exports = router.routes();