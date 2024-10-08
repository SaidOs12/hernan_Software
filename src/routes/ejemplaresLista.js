const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/ejemplaresListas', async (req,res) =>{
  const ejemplar = await pool.query('SELECT * FROM ejemplar');
  res.render('page-ejemplaresLista',  { ejemplar });
});

module.exports = router;  