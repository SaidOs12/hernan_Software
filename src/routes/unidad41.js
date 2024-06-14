const express = require('express');
const router = express.Router();


router.get('/unidad41', async (req,res) =>{
  res.render('page-unidad41');
});

module.exports = router;