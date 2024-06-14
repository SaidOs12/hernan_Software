const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const soundFile = 'https://dl.sndup.net/mns2/y2matecom%20-%20Whoville.mp3'
  res.render('index', { soundFile });
});


module.exports = router;