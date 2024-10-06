const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasDelete');

router.get('/eliminarusuario', (req, res) => {
  res.render('eliminarusuario');
});

router.post('/eliminarusuario', async (req, res) => {
  try {
    console.log(req.body);
    const { error } = schemasPersona.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      res.redirect('/tablainformacionpersonal');
    }
    
    // Verificar si la cédula ya existe en la base de datos
    const existeCedula = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.cedula]);
    if (existeCedula.length > 0) {
      console.log("BIEN")
      await pool.query('DELETE FROM persona WHERE cedula = ?', [req.body.cedula]);
      req.flash('success', 'Usuario eliminado correctamente');
      res.redirect('/eliminarusuario');
    }
    
    else {
      req.flash('error', 'La cédula ingresada no esta en el sistema');
      res.redirect('/eliminarusuario');
      return;
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;