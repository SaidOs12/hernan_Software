const express = require('express');
const router = express.Router();


router.get('/infopersonal', async (req,res) =>{
  res.render('page-informacionpersonal');
});

module.exports = router;