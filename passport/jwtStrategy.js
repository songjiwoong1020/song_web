const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const logger = require('../config/logger');

let opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrkey = process.env.JWT_SECRET;

passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    //내용~
}));