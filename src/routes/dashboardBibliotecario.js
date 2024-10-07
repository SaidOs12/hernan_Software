const express = require('express');
const router = express.Router();


router.get('/dashboardBibliotecario', async (req,res) =>{
  res.render('dashboardBibliotecario');
});

module.exports = router;