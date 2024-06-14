const express = require('express');
const router = express.Router();


router.get('/unidad24eva', async (req,res) =>{
  res.render('page-unidad24eva');
});

module.exports = router;