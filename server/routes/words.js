const express = require('express');
const router = express.Router();
const Word = require('../models/word');

//Find all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find a Word
router.get('/:word', async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.word });
    res.json(word);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add word to DB
router.post('/', async (req, res) => {
  const word = new Word({
    word: req.body.word,
    meaning: req.body.meaning,
    hanjaList: req.body.hanjaList,
  });

  try {
    const newWord = word.save();
    res.json(newWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
