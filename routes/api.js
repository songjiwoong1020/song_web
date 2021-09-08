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

router.get('/kakao', passport.authenticate('kakao', { session: false }));

router.get('/kakao/callback', passport.authenticate('kakao', {
    session: false,
    failureRedirect: '/'
    }), (req, res) => {
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