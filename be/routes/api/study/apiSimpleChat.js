const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.get('/simpleChat', (req, res, next) => {

  res.send({ success: true, body: 'simpleChat' })

});
router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;