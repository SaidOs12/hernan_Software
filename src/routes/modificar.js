const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/page-modificacionEjem', async (req, res) => {
  res.render('page-modificacionEjem');
});

router.post('/page-modificacionEjem', async (req, res) => {
  try {
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