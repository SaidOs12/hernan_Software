const express = require('express');
const router = express.Router();


router.get('/unidad39eva', async (req,res) =>{
  res.render('page-unidad39eva');
});

module.exports = router;