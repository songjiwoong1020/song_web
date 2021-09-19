/*
 * 페이지만 띄워준다. 나중에 리액트로 대체 
 */
const express = require('express');
const passport = require('passport');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {    
    res.render('main.ejs', {req, res});
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/kakao/callback', passport.authenticate('kakao', {
        session: false,
        failureRedirect: '/',
        }), async (req, res) => {
            try{
                const result = await axios.post('http://localhost:8001/api/token', {
                    user: req.user
                });
                const token = result.data.data
                res.header({ Authorization: 'bearer ' + token}).render('login_process.ejs');
            } catch (err) {
                console.log(err);
            }
        });

router.get('/profile', (req, res) => {
    res.render('profile.ejs');
});

module.exports = router;