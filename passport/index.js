const passport = require('passport');
const kakao = require('./kakaoStrategy');

const User = require('../models/user');

module.exports = () => {

    kakao();
}