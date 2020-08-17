const express = require('express');
const Hanja = require('../models/hanja');
const router = express.Router();

//Find All Hanja from DB
router.get('/', async (req, res) => {
  try {
    const hanjas = await Hanja.find();
    res.json(hanjas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find One Hanja from DB
router.get('/:hanja', async (req, res) => {
  try {
    const hanja = await Hanja.findOne({ hanja: req.params.hanja });
    res.json(hanja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD Hanja to DB
router.post('/', async (req, res) => {
  const hanja = new Hanja({
    hanja: req.body.hanja,
    meaning: req.body.meaning,
    wordList: req.body.wordList,
  });

  try {
    const newHanja = await hanja.save();
    res.status(201).json(newHanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE Hanja from DB
// router.delete('/:id', async (req, res) => {
//   try {
//     await Hanja.find({ _id: req.params.id }).deleteOne();
//     res.send('Hanja deleted');
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
