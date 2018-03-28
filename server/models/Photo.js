const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = Schema({
  caption: String,
  imageUrl: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Photo = mongoose.model ('Photo', photoSchema)
module.exports = Photo