const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/page-modificacionEjemPrestamo', async (req, res) => {
  res.render('page-modificacionEjemPrestamo');
});

router.post('/page-modificacionEjemPrestamo', async (req, res) => {
  try {
    
    const multa =false;
    if(req.body.multa === "Si"){
      multa=true;
    }
    const { idPrestamo, idInventario, cedula, fecha, fechaTope, fechaDevolucion} = req.body;

    // Update the user information
    await pool.query(
      'UPDATE prestamo SET idInventario = ?, cedula = ?, fecha = ?, fechaTope = ?, fechaDevolucion = ?, multa = ? WHERE idPrestamo = ?',
      [idInventario, cedula, fecha, fechaTope, fechaDevolucion, multa, idPrestamo]
    );

    req.flash('success', 'Prestamo actualizado correctamente');
    res.redirect('/ejemplaresListasPrestamo');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la petición: " + error.message);
  }
});

module.exports = router;