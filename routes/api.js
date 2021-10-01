const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../config/logger');
const util = require('../util/util');

const Post = require('../models/post');

const router = express.Router();

router.post('/main', async (req, res) => {
    try{
        const posts = await Post.findAll({
            order: [['created_at', 'ASC']],
            limit: 5
        });
        res.json(util.successTrue(posts));
    } catch(err) {
        logger.error(err);
        return res.status(500).json(util.successFalse(err), 'POST /main error');
    }
});

router.get('/kakao', passport.authenticate('kakao', { session: false }));

router.post('/token', (req, res) => {
    const user = req.body.user;
    const token = jwt.sign({
        id: user.id,
        nick: user.user_nick
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        //expiresIn: '5s',// refresh토큰 구현시 사용하자
        issuer: 'jiwoong'
    });
    return res.json(util.successTrue(token));
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
        res.status(201).json(util.successTrue(post));
    } catch(err) { 
        logger.error(err);
        return res.status(500).json(util.successFalse(err, 'POST /board/write error'));
    }
});

router.post('/board/update', async (req, res) => {
    try{
        const updatePost = await Post.update({
            post_title: req.body.title,
            post_content: req.body.content,
            post_writer: req.body.user_nick
        });
        //console.log(post);
        res.status(201).json(util.successTrue(post));
    } catch(err) { 
        logger.error(err);
        return res.status(500).json(util.successFalse(err, 'POST /board/write error'));
    }
});

module.exports = router;