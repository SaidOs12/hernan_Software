const express = require('express');
const router = express.Router();


router.get('/unidad42', async (req,res) =>{
  res.render('page-unidad42');
});

module.exports = router;