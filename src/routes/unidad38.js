const express = require('express');
const router = express.Router();


router.get('/unidad38', async (req,res) =>{
  res.render('page-unidad38');
});

module.exports = router;