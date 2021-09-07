/*
 * 페이지만 띄워준다. 나중에 리액트로 대체 
 */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

module.exports = router;