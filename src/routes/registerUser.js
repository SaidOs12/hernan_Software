const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/infopersonal', (req, res) => {
  res.render('infopersonal');
});

router.post('/infopersonal', async (req, res) => {
  try {
    console.log(req.body);
    const { error } = schemasPersona.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      res.redirect('/infopersonal');
    }
    
    // Verificar si la cédula ya existe en la base de datos
    const existeCedula = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.cedula]);
    if (existeCedula.length > 0) {
      req.flash('error', 'La cédula ingresada ya está registrada');
      res.redirect('/infopersonal');
      return;
    }
    
    else {
      const hashContraseña = bcrypt.hashSync(req.body.password, 10);
      const {
        nombre,
        apellidos,
        fecha_nacimiento,
        telefono,
        direccion,
        cedula,
        tipo_usuario
      } = req.body;
      const persona = {
        nombre,
        apellidos,
        fecha_nacimiento,
        telefono,
        direccion,
        cedula,
        tipo_usuario,
        contrasena: hashContraseña
      };
      
      console.log("BIEN")
      await pool.query('INSERT INTO persona SET ?', [persona]);
      req.flash('success', 'Usuario registrado correctamente');
      res.redirect('/infopersonal');
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;