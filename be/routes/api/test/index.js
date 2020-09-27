var createError = require('http-errors');
var express = require('express');
var router = express.Router();

router.get('/hello', function (req, res, next) {
  res.send({ msg: 'hello', a: 22222 })
})

router.get('/hello2', function (req, res, next) {
  res.send({ msg: 'hello2', a: 3333 })
})

router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router