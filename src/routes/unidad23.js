const express = require('express');
const router = express.Router();


router.get('/unidad23', async (req,res) =>{
  res.render('page-unidad23');
});

module.exports = router;