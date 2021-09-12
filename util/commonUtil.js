const jwt = require('jsonwebtoken');
/*
토큰 검증을 위한 미들웨어
*/
exports.accessToken = (req, res) => {
    
}

exports.verifyToken = (req, res, next) => {
    try {
        //jwt.verify는 토큰을 검증하는 메서드 첫번째 인수에 토큰을, 두번째 인수에 비밀키를 넣어 사용한다.
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            return res.status(419).json({
            code: 419,
            message: '토큰이 만료되었습니다',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다',
        });
    }
};

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
}