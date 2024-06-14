const express = require('express');
const router = express.Router();


router.get('/proceso', async (req,res) =>{
  res.render('proceso');
});

module.exports = router;