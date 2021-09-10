const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const logger = require('../config/logger');

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.CLIENT_ID,
        callbackURL: '/api/oauth',
        clientSecret: process.env.CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const exUser = await User.findOne({
                where: { user_snsid: profile.id, user_provider: 'kakao' }
            });
            if(exUser){
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    user_email: profile._json && profile._json.kaccount_email,
                    user_nick: profile.displayName,
                    user_provider: 'kakao',
                    user_snsid: profile.id,
                    user_created: new Date()
                });
                done(null, newUser);
            }
        } catch (err) {
            logger.error(err);
            done(err);
        }
    }));
}
