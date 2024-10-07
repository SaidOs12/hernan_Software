const express = require('express');
const router = express.Router();


router.get('/proceso', async (req,res) =>{
  res.render('proceso');
});
router.post('/proceso', async (req,res) =>{
  try {
    const { cedula } = req.body;
    
    // Si el usuario existe, lo eliminamos
    await pool.query('DELETE FROM persona WHERE cedula = ?', [cedula]);
    
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/page-bancopreguntas'); // O redirige a donde prefieras después de eliminar
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la petición: " + error.message);
  }  
})
module.exports = router;