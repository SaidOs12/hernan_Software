const express = require('express');
const router = express.Router();


router.get('/unidad34', async (req,res) =>{
  res.render('page-unidad34');
});

module.exports = router;