const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/page-modificacionEjemPrestamo', async (req, res) => {
  res.render('page-modificacionEjemPrestamo');
});

router.post('/page-modificacionEjemPrestamo', async (req, res) => {
  try {
    let multado = false;  // Cambiado de const a let

if(req.body.multa === "si") {
    multado = true;
}

const { idPrestamo, idInventario, cedula, fechaDevolucion } = req.body;

// Update the user information
await pool.query(
      'UPDATE prestamo SET idInventario = ?, cedula = ?, fechaDevolucion = ?, multa = ? WHERE idPrestamo = ?',
      [idInventario, cedula, fechaDevolucion, multado, idPrestamo]
      );

      await pool.query(
          'UPDATE ejemplar SET estado = ? WHERE idInventario = ?',
          ["Disponible", idInventario]
      );

      if(multado) {
          const {
              idPrestamo,
              cedula
          } = req.body;
          
          const multa = {
              idPrestamo,
              cedula
          };
          
          req.flash('success', 'Prestamo actualizado correctamente, registremos la multa');
          res.redirect('/page-registerMulta', { multa });
      } else {
          req.flash('success', 'Prestamo actualizado correctamente');
          res.redirect('/ejemplaresListasPrestamo');
      }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la petición: " + error.message);
  }
});

module.exports = router;