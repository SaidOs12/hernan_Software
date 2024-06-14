const express = require('express');
const router = express.Router();


router.get('/unidad16', async (req,res) =>{
  res.render('page-unidad16');
});

module.exports = router;