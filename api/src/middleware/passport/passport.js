const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const User = require('../../db')
const passport = require('passport')

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(new jwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
           
        }
    });
}));