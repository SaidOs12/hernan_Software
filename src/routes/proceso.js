const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/proceso', async (req,res) =>{
  res.render('proceso');
});
router.post('/proceso', async (req,res) =>{
  try {
    const { cedula } = req.body;
    
    // Si el usuario existe, lo eliminamos
    await pool.query('DELETE FROM persona WHERE cedula = ?', [cedula]);
    
    req.flash('success', 'Usuario eliminado correctamente');
    
    res.redirect('/unidadUnoAgregar'); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la petición: " + error.message);
  }  
})
module.exports = router;