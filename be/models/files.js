const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const fileSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  name: { type: String, default: '', index: true },
  type: { type: String, default: '' },
  size: { type: Number, default: 0 },
  path: { type: Number, default: 0 },
  createDate: { type: Number, default: 0 },
  updateDate: { type: Number, default: 0 },
  cntDown: { type: Number, default: 0 },
  articleId: { type: String, default: '' },
  ip: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
})

module.exports = mongoose.model('File', fileSchema)