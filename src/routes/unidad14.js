const express = require('express');
const router = express.Router();


router.get('/unidad14', async (req,res) =>{
  res.render('page-unidad14');
});

module.exports = router;