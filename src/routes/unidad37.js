const express = require('express');
const router = express.Router();


router.get('/unidad37', async (req,res) =>{
  res.render('page-unidad37');
});

module.exports = router;