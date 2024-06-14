const express = require('express');
const router = express.Router();


router.get('/unidad1', async (req,res) =>{
  res.render('page-unidad11');
});

module.exports = router;