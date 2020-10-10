const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const boardSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true, unique: true },
  title: { type: String, default: '' },
  type: { type: String, default: '' },
  readLv: { type: Number, default: 0 },
  createLv: { type: Number, default: 0 },
  rmk: { type: String, default: '' },
  categories: { type: Array, default: ['Default'] },
  tags: { type: Array, default: ['Default'] }
})

module.exports = mongoose.model('Board', boardSchema)