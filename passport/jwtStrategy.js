const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const logger = require('../config/logger');
const dotenv = require('dotenv');
dotenv.config();
console.log(`process.env.JWT_SECRET= ${process.env.JWT_SECRET}`)
const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: 'keys.' + process.env.JWT_SECRET
}

passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    console.log(`jwt_payload = ${jwt_payload}`);
    //토큰이 있다면
    //done(null, user);
    //없다면
    //done(null);
}));