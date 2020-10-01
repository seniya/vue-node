var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
const cfg = require('../config')


var apiRouter = require('./routes/api/index');
const history = require('connect-history-api-fallback')


var app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));
app.use(history())
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message })
});


//console.log('cfg : ', cfg)
mongoose.connect(cfg.dbUrl, { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
})
/*
const jwt = require('jsonwebtoken')
const key = '어려운키'
const token = jwt.sign({ id: 'seniya', email: 'seniya2@gmail.com' }, key)

const decoded = jwt.verify(token, key)

console.log('jwt : ', token)
console.log('decoded : ', new Date(decoded.iat * 1000))
*/
module.exports = app;
