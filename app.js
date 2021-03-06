const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const logger = require('./config/logger');
const passportConfig = require('./passport');

const pageRouter = require('./routes/page');
const apiRouter = require('./routes/api');
const { sequelize } = require('./models');

const app = express();

passportConfig();

app.set('port', process.env.PORT || 8001);

app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

sequelize.sync({ force: false })
    .then(() => {
        console.log('db connect');
    })
    .catch((err) => {
        logger.error(err);
    })
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '/client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use(passport.initialize());

app.use('/', pageRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.render('error.ejs');
});

module.exports = app;