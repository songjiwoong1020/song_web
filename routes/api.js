const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../config/logger');
const Post = require('../models/post');
const axios = require('axios');
const store = require('store');
const { verifyToken } = require('../util/commonUtil');

const router = express.Router();

router.post('/main', async (req, res, next) => {
    console.log('/api/main ajax요청');
    console.log(`req.headers = ${JSON.stringify(req.headers.authorization)}`);
    try{
        if(req.headers['authorization']){
            console.log('메인에서 토큰 있음');
        }
        const posts = await Post.findAll({
            order: [['created_at', 'ASC']],
            limit: 5
        });
        res.json(posts);
    } catch(err) {
        logger.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });
    }
});

router.get('/kakao', passport.authenticate('kakao', { session: false }));

router.get('/oauth', passport.authenticate('kakao', {
    session: false,
    failureRedirect: '/',
    }), async (req, res) => {
        await axios.post('http://localhost:8001/api/token', {
            user: req.user
        })
        res.render('main.ejs', {req, res});
    });

router.post('/token', (req, res) => {
    const { user } = req.body;
    const accessToken = jwt.sign({
        id: user.id,
        nick: user.user_nick
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        //expiresIn: '10m', refresh토큰 구현시 사용하자
        issuer: 'jiwoong'
    });
    console.log(`accessToken = ${accessToken}`);
    //res.setHeader({ authorization:'bearer', accessToken }).send('main.ejs', {req, res});
    res.headers({ authorization: accessToken });
});


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


router.post('/board/write', async (req, res) => {
    try{
        const post = await Post.create({
            post_title: req.body.title,
            post_content: req.body.content,
            post_writer: req.body.user_nick
        });
        //console.log(post);
        res.status(201).json(post);
    } catch(err) { 
        logger.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });
    }
});

module.exports = router;