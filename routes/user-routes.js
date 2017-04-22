const Router = require('koa-router');
const router = new Router({
  prefix: '/users'
});
const usersController = require('../controllers/usersController');

router.get('/', async function(ctx) {
  ctx.body = await usersController.getUsers();
});

router.get('/:id', ctx => {
  ctx.body = ctx.originalUrl;
});

router.post('/', async ctx => {
  var user = await usersController.createUser(ctx.request.body);
  ctx.body = user;
});

module.exports = router.middleware();