const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuarioAct');

router.get('/page-modificacion', async (req, res) => {
  res.render('page-modificacion');
});

router.post('/page-modificacion', async (req, res) => {
  try {
    console.log(req.body);
    const { error } = schemasPersona.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      res.redirect('/page-modificacion');
    }
    
    const { cedula, nombre, apellidos, telefono, direccion } = req.body;

    // Update the user information
    await pool.query(
      'UPDATE persona SET nombre = ?, apellidos = ?, telefono = ?, direccion = ? WHERE cedula = ?',
      [nombre, apellidos, telefono, direccion, cedula]
    );

    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/page-actualizar');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la petición: " + error.message);
  }
});

module.exports = router;