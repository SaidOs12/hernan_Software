const express = require('express');
const router = express.Router();


router.get('/unidad21', async (req,res) =>{
  res.render('page-unidad21');
});

module.exports = router;