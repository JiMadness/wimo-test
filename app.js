require('dotenv').config({path: '.env'});
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const db = require('./db/dbManager');

db.testConnection(function () {
    db.syncDB();
});

const index = require('./routes/index');

const app = express();

app.use(require('helmet')());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', index);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
