const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasDelete');

router.get('/tablainfopersonal', (req, res) => {
  res.render('tablainfopersonal');
});

router.post('/tablainfopersonal', async (req, res) => {
  try {
    console.log(req.body);
    
    
    // Verificar si la cédula ya existe en la base de datos
    const existeCedula = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.cedula]);
    if (existeCedula.length > 0) {
      console.log("BIEN")
      await pool.query('DELETE FROM persona WHERE cedula = ?', [req.body.cedula]);
      req.flash('success', 'Usuario eliminado correctamente');
      res.redirect('/tablainfopersonal');

      req.flash('error', 'La cédula ingresada ya está registrada');
      res.redirect('/tablainfopersonal');
      return;
    }
    
    else {
      req.flash('error', 'La cédula ingresada no esta en el sistema');
      res.redirect('/tablainfopersonal');
      return;
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;