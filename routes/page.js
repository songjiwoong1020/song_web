/*
 * 페이지만 띄워준다. 나중에 리액트로 대체 
 */
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {    
    res.render('main.ejs', {req, res});
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/loginProcess', (req, res) => {
    res.render('login_process.ejs');
});

router.get('/profile', (req, res) => {
    res.render('profile.ejs');
});

module.exports = router;