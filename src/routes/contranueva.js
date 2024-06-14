const express = require('express');
const router = express.Router();


router.get('/contrasenanueva', async (req,res) =>{
  res.render('contrasenanueva');
});

module.exports = router;