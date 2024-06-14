const express = require('express');
const router = express.Router();


router.get('/unidad36', async (req,res) =>{
  res.render('page-unidad36');
});

module.exports = router;