const express = require('express');
const router = express.Router();


router.get('/unidad32', async (req,res) =>{
  res.render('page-unidad32');
});

module.exports = router;