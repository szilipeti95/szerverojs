const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jji6wk', { useNewUrlParser: true });

module.exports = mongoose;