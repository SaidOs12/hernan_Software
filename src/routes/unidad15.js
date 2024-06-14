const express = require('express');
const router = express.Router();


router.get('/unidad15', async (req,res) =>{
  res.render('page-unidad15');
});

module.exports = router;