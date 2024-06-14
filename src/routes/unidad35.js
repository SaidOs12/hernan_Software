const express = require('express');
const router = express.Router();


router.get('/unidad35', async (req,res) =>{
  res.render('page-unidad35');
});

module.exports = router;