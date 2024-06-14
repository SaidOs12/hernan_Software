const express = require('express');
const router = express.Router();


router.get('/unidad22', async (req,res) =>{
  res.render('page-unidad22');
});

module.exports = router;