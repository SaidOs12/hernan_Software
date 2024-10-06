const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/tablainfopersonal', async (req,res) =>{
  const usuario = await pool.query('SELECT * FROM persona');
  res.render('page-tablainformacionpersonal',  { usuario });
});

module.exports = router;  