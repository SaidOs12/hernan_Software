const express = require('express');
const router = express.Router();

router.get('/agregarLibro', (req, res) => {
  res.render('page-registerBook');
});

module.exports = router;