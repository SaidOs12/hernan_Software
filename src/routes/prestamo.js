const express = require('express');
const router = express.Router();


router.get('/registerPrestamo', async (req,res) =>{
  res.render('page-registerPrestamo');
});

module.exports = router;