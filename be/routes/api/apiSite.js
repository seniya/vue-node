const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Site = require('../../models/sites')

router.get('/', (req, res, next) => {
  Site.findOne({})
    .then(r => {
      res.send({ success: true, body: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});
router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;