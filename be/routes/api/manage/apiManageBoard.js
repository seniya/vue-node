const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Board = require('../../../models/boards')

router.post('/', (req, res, next) => {
  const { name, title, type, readLv, createLv, categories, tags } = req.body
  const board_ = {
    name,
    title,
    type,
    readLv,
    createLv,
    createDate: new Date().getTime(),
    updateDate: new Date().getTime()
  }

  Board.create(board_)
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/', function (req, res, next) {
  Board.find()
    .then(rs => {
      res.send({ success: true, body: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  Board.updateOne({ _id }, { $set: req.body })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  Board.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;