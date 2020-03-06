var express = require('express');
var router = express.Router();

var images = [{ id: 1,
  imageUri: null,
}, { id: 2,
  imageUri: null,
},{ id: 3,
  imageUri: null,
},{ id: 4,
  imageUri: null,
}];

router.get('/:id', function(req, res, next) {
  res.render('album', { images: images });
});

module.exports = router;
