const express = require('express');
const router = express.Router();


router.get('/recuperarcontrasena', async (req,res) =>{
  res.render('recuperarcontrasena');
});

module.exports = router;