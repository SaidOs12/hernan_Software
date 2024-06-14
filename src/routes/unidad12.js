const express = require('express');
const router = express.Router();


router.get('/unidad12', async (req,res) =>{
  res.render('page-unidad12');
});

module.exports = router;