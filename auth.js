const
  BasicStrategy = require('passport-http').BasicStrategy,
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('./models/User');

module.exports = passport => {
  passport.use(new BasicStrategy(async function(username, password, done) {

    let user = await User.findByUsername(username);
    
    if(!user) return done(null, false, { message: 'Incorrect username' });

    let valid = await user.checkPassword(password);
    
    if(!valid) return done(null, false, { message: 'Incorrect password' });

    user.setJwt();
    await user.save();

    delete user.password;

    return done(null, user);

  }));


  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret'
  }, async function(payload, done) {
    let user = await User.findByUsername(username);
    if(!user) return done(null, false)
    return done(null, user);
  }));

}

