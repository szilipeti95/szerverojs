const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jji6wk', { useUnifiedTopology: true, useNewUrlParser: true }, function(err) {
    if (err) console.log(err);
});

module.exports = mongoose;