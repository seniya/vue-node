const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const imgConvert = require('base64-img')
const sharp = require('sharp')
const fs = require('fs')
const moment = require('moment')
const path = require('path');
const File = require('../../models/files')

const multer = require('multer')

function weekOfMonth(m) {
  return m.week() - moment(m).startOf('month').week() + 1
}

function strWeekOfMonth() {
  const nowDate = moment(new Date())
  return nowDate.format('YYYY_MM_') + weekOfMonth(nowDate)
}

router.post('/', multer({ dest: `../upload/${strWeekOfMonth()}/` }).single('bin'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  const {
    originalname,
    mimetype,
    destination,
    filename,
    path,
    size
  } = req.file

  const fileItem = {
    originalname,
    mimetype,
    destination,
    filename,
    path,
    size,
    ip: '1.1.1.1', //req.ip
    createDate: new Date().getTime(),
    updateDate: new Date().getTime(),
    articleId: null,
    _user: null,
    title: '',
  }
  if (req.user._id) fileItem._user = req.user._id
  if (req.body.title) fileItem.title = req.body.title
  if (req.body.articleId) fileItem.articleId = req.body.articleId

  File.create(fileItem)
    .then(r => {
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.post('/image', multer({ dest: `../upload/${strWeekOfMonth()}/` }).single('bin'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  imgConvert.base64(req.file.path, (err, fd) => {
    if (err) return next(err)
    console.log(fd.toString())
    fs.writeFileSync(`../upload/${strWeekOfMonth()}/${req.file.filename}.txt`, fd)
  })
  res.status(204).send()
})

router.post('/image/sharp', multer({ dest: `../upload/${strWeekOfMonth()}/` }).single('bin'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  const fn = req.file.path + 'sharp'
  sharp(req.file.path).resize(200, 200).crop(sharp.strategy.entropy).toFile(fn, (err, info) => {
    if (err) return next(err)
    imgConvert.base64(fn, (err, fd) => {
      if (err) return next(err)
      fs.unlinkSync(req.file.path)
      fs.unlinkSync(fn)
      console.log(fd.length)
      res.send(fd.toString())
    })
  })
})

// router.get('/download', (req, res, next) => {
//   express.static(path.join(__dirname, "./public"))
//   var file = fs.readFileSync(__dirname + '/upload-folder/dramaticpenguin.MOV', 'binary');

//   res.setHeader('Content-Length', file.length);
//   res.write(file, 'binary');
//   res.end();
// });

// router.get("/download", express.static(path.join(__dirname, "../upload")));
router.get("/download", (req, res) => {
  res.type('png')
  res.sendFile(path.join(__dirname, "../../../upload", '/2020_10_2', '/', '22efc6cc2891a24a238c36bbe1d9c199'));
  // res.sendFile('../upload/2020_10_2/22efc6cc2891a24a238c36bbe1d9c199');
});

router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;