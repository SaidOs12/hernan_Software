const express = require('express');
const router = express.Router();

router.get('/agregarLibro', async (req,res) =>{
  res.render('page-registerBook');
});

module.exports = router;