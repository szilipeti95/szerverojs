const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Album = db.model('Album', {
    name: {
      type: String,
      required: true
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    _likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    creationDate: Number,
    public: Boolean,
    images: [String],
    tags: [String]
  })

module.exports = Album;