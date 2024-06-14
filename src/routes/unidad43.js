const express = require('express');
const router = express.Router();


router.get('/unidad43', async (req,res) =>{
  res.render('page-unidad43');
});

module.exports = router;