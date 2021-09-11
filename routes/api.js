const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../config/logger');
const Post = require('../models/post');
const { verifyToken } = require('../util/commonUtil');

const router = express.Router();

router.post('/main', async (req, res, next) => {
    console.log('/api/main ajax요청');
 
    try{
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

router.get('/kakao', passport.authenticate('kakao'));

router.get('/oauth', passport.authenticate('kakao', {
    session: false,
    failureRedirect: '/',
    failureFlash: true//배포 과정에서 이 옵션은 비활성화 하자. error메시지 제공해주는역할.
    }), (req, res) => {
        console.log(`req.body = ${JSON.stringify(req.body)}`);
        console.log(`req.query = ${JSON.stringify(req.query)}`);
        console.log(`로그인 후 req.user = ${JSON.stringify(req.user)}`)
        res.redirect('/');
    });



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