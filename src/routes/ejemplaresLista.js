const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/ejemplaresListas', async (req,res) =>{
  const usuario = await pool.query('SELECT * FROM ejemplar');
});

module.exports = router;  