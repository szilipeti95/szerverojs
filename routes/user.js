var express = require('express');
var router = express.Router();

var albums = [{ id: 1,
  name: "Name1",
  author: "Author1",
  likeCount: 1,
  isLiked: false,
  isPublic: true,
  tags: ["tag1", "tag2"],
  creationDate: 1
}, { 
  id: 2,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}, { 
  id: 3,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}, { 
  id: 4,
  name: "Name2",
  author: "Author2",
  likeCount: 2,
  isLiked: true,
  isPublic: true,
  thumbnailUri: null,
  tags: ["tag1", "tag3"],
  creationDate: 2
}];


router.get('/', function(req, res, next) {
  res.render('user', { albums: albums });
});

module.exports = router;
