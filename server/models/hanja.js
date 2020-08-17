const mongoose = require('mongoose');

const hanjaSchema = new mongoose.Schema({
  hanja: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  wordList: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Hanja', hanjaSchema);
