const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/ejemplaresLista', async (req,res) =>{
  const usuario = await pool.query('SELECT * FROM ejemplar');
  res.render('page-tablainformacionpersonal',  { ejemplar });
});

module.exports = router;  