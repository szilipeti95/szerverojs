const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    _likedAlbum: {
      type: [Schema.Types.ObjectId],
      ref: 'Album'
    },
    imageUri: String
  })

module.exports = User;