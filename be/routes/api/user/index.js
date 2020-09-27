const express = require('express')
const createError = require('http-errors')
const User = require('../../../models/users')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const r = await User.find()
    res.send({ success: true, users: r })
  } catch (error) {
    res.send({ success: false, msg: error.message })
  }
})

router.post('/', async (req, res, next) => {
  const { name, age } = req.body
  const u = new User({ name, age })
  try {
    const r = await u.save()
    res.send({ success: true, msg: r })
  } catch (error) {
    res.send({ success: false, msg: error.message })
  }
})

router.put('/', (req, res, next) => {
  // console.log(req)
  res.send({ success: true, msg: 'put ok' })
})

router.delete('/', (req, res, next) => {
  // console.log(req)
  res.send({ success: true, msg: 'del ok' })
})

router.all('*', (req, res, next) => {
  next(createError(404, 'no more api'))
})

module.exports = router
