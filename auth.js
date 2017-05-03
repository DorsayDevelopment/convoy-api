const
  BasicStrategy = require('passport-http').BasicStrategy,
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('./models/User');

const SECRET = process.env.API_SECRET || 'secret';

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
    secretOrKey: SECRET,
    passReqToCallback: true
  }, async function(request, payload, done) {
    let user = await User.findById(payload.id);
    if(!user) return done(null, false)
    return done(null, user);
  }));
}

