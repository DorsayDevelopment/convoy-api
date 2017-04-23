const usersController = require('../controllers/usersController');
const Router = require('koa-router');
const router = new Router({
  prefix: '/users'
});

router.get('/', async ctx => {
  ctx.body = await usersController.getUsers();
});

router.get('/:id', async ctx => {
  ctx.body = await usersController.getUserById(ctx.params.id);
});

router.post('/', async ctx => {
  var user = await usersController.createUser(ctx.request.body);
  ctx.body = user;
});

module.exports = router.middleware();