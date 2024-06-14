const express = require('express');
const router = express.Router();


router.get('/unidad13', async (req,res) =>{
  res.render('page-unidad13');
});

module.exports = router;