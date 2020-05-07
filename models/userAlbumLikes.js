const Schema = require('mongoose').Schema;
const db = require('../config/db');

const UserAlbumLikes = db.model('UserAlbumLikes', {
  _album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = UserAlbumLikes;