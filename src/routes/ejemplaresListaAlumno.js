const express = require('express');
const router = express.Router();
const pool = require('../db');
const joi = require('joi');
const bcrypt = require('bcryptjs');

router.get('/ejemplaresListasAlumno', async (req,res) =>{
  const ejemplar = await pool.query('SELECT * FROM ejemplar');
  res.render('page-ejemplaresListaAlumno',  { ejemplar });
});


module.exports = router;