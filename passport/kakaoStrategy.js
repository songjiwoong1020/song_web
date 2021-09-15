const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const logger = require('../config/logger');

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.CLIENT_ID,
        callbackURL: '/api/kakaoCallback',
        clientSecret: process.env.CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({
                where: { user_snsid: profile.id, user_provider: 'kakao' }
            });
            if(exUser){
                console.log('로그인 성공');
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    user_email: profile._json.kakao_account.email,
                    user_nick: profile.displayName,
                    user_provider: 'kakao',
                    user_snsid: profile.id,
                    user_created: new Date()
                });
                console.log('로그인 성공');
                done(null, newUser);
            }
        } catch (err) {
            logger.error(err);
            done(err);
        }
    }));
}
