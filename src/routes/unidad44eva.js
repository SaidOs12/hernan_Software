const express = require('express');
const router = express.Router();


router.get('/unidad44eva', async (req,res) =>{
  res.render('page-unidad44eva');
});

module.exports = router;