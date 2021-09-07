const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const Post = require('../models/post');
const { verifyToken } = require('../util/commonUtil');

const router = express.Router();

/*
토큰 생성을 위한 메서드
*/
router.post('/token', (req, res) => {
    try {
        const { clientSecret } = req.body;
        if(clientSecret !== process.env.CLIENT_SECRET){
            return res.status(401).json({
                code : 401,
                message : 'clientsecret키가 일치하지 않습니다.'
            });
        }
        const token = jwt.sign({
            contents : 'hello' // 첫번째 인수 : jwt 토큰에 넣어둘 내용
        }, process.env.JWT_SECRET, { // 두번째 인수 : 토큰의 비밀 키. 유출시 누구나 임의로 토큰생성가능!!
            // 세번째 인수 : 토큰의 설정. 
            expiresIn : '10m', // 10분
            issuer : 'jiwoong' // 발급자
        });
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    }
});

router.get('/tokentest', verifyToken, (req, res) => {
    console.log(req.decoded);
    res.json(req.decoded);
});

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