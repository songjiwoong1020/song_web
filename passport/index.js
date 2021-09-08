const passport = require('passport');
const kakao = require('./kakaoStrategy');

const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user[0].user_snsId);
    });

    passport.deserializeUser((id, done) => {
        done(null, 'd');

    });

    kakao();
}