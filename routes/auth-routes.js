const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();

router.post('/login', passport.authenticate('basic', { session: false }), ctx => {
  ctx.body = ctx.state.user;
});

module.exports = router.middleware();