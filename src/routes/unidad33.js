const express = require('express');
const router = express.Router();


router.get('/unidad33', async (req,res) =>{
  res.render('page-unidad33');
});

module.exports = router;