const
  Koa = require('koa'),
  app = new Koa(),
  bodyParser = require('koa-bodyparser'),
  passport = require('koa-passport');

require('./auth')(passport);

app.use(bodyParser());
app.use(passport.initialize())

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(require('./routes/user-routes'));
app.use(require('./routes/auth-routes'));
app.use(require('./routes/group-routes'));

app.listen(9000);