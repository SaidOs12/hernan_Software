const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/registerMulta', (req, res) => {
  res.render('registerMulta');
});

router.post('/registerMulta', async (req, res) => {
  try {
    console.log(req.body);
      const {
        fecha,
        importe,
        fechaPago,
        idPrestamo,
        cedula
      } = req.body;
      const multa = {
        fecha,
        importe,
        fechaPago,
        idPrestamo,
        cedula
      };
      

      console.log("BIEN")
      await pool.query('INSERT INTO multa SET ?', [multa]);
      req.flash('success', 'Multa registrada correctamente');
      res.redirect('/login');
    
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;