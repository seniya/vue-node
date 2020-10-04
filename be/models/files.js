const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const fileSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  originalname: { type: String, default: '', index: true },
  encoding: { type: String, default: '', index: true },
  mimetype: { type: String, default: '', index: true },
  destination: { type: String, default: '', index: true },
  filename: { type: String, default: '', index: true },
  path: { type: String, default: '', index: true },  
  size: { type: Number, default: 0 },
  createDate: { type: Number, default: 0 },
  updateDate: { type: Number, default: 0 },
  cntDown: { type: Number, default: 0 },
  articleId: { type: String, default: '' },
  useAble: { type: Boolean, default: false },
  ip: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },

  /*
    fieldname: 'bin',
    originalname: 'icons8-64.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: '../upload/',
    filename: '95a460df9de9a4b761d64300681ca353',
    path: '..\\upload\\95a460df9de9a4b761d64300681ca353',
    size: 1393
  */
})

module.exports = mongoose.model('File', fileSchema)