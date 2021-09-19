const jwt = require('jsonwebtoken');

let util = {};

util.successTrue = data => {
    return {
        success: true,
        message: null,
        errors: null,
        data: data
    }
}

util.successFalse = (err, message) => {
    if(!err && !message) message = 'please define your message';
    return {
        success: false,
        message: message,
        errors: (err) ? util.parseError(err): null,
        data: null
    }
}

util.isLoggedin = (req, res, next) => {
    let token = req.headers[authorization];
    if(!token){
        return res.json(util.successFalse(null, 'token is required'));  
    } else {
        //검증

    }
}

module.exports = util;