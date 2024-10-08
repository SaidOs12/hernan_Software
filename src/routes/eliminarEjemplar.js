const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/eliminarEjemplar', async (req,res) =>{
  res.render('eliminarEjemplar');
});
router.post('/eliminarEjemplar', async (req,res) =>{
  try {
    const { cedula } = req.body;
    
    // Si el usuario existe, lo eliminamos
    await pool.query('DELETE FROM ejemplar WHERE idInventario = ?', [idInventario]);
    
    req.flash('success', 'Ejemplar eliminado correctamente');
    
    res.redirect('/page-ejemplaresLista'); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la petición: " + error.message);
  }  
})
module.exports = router;