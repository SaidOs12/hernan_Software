const express = require('express');
const router = express.Router();


router.get('/unidad31', async (req,res) =>{
  res.render('page-unidad31');
});

module.exports = router;