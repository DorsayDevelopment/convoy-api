const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();

router.post('/login', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send(req.user);
});