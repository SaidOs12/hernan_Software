const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/page-modificacionEjem', async (req, res) => {
  res.render('page-modificacionEjem');
});

router.post('/page-modificacionEjem', async (req, res) => {
  try {
    const { idInventario, nombre, estado, costoEjemplar, registroDaños, libroISBN, autor, editorial, año } = req.body;

    // Update the user information
    await pool.query(
      'UPDATE ejemplar SET nombre = ?, estado = ?, costoEjemplar = ?, registroDaños = ?, libroISBN = ?, autor = ?, editorial = ?, año = ? WHERE idInventario = ?',
      [nombre, estado, costoEjemplar, registroDaños, libroISBN, autor, editorial, año, idInventario]
    );

    req.flash('success', 'Ejemplar actualizado correctamente');
    res.redirect('/ejemplaresListas');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la petición: " + error.message);
  }
});

module.exports = router;