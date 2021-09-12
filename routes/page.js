/*
 * 페이지만 띄워준다. 나중에 리액트로 대체 
 */
const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('../util/commonUtil');

const router = express.Router();

router.get('/', (req, res) => {    
    res.render('main.ejs', {req, res});
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/profile', //passport.authenticate('jwt', { session: false}),
(req, res) => {
    console.log(`req.jwt = ${req.jwt}`);

    res.render('profile.ejs');
});

module.exports = router;