const express = require('express');
const router = express.Router();

// Mostrar el dashboard del bibliotecario
router.get('/dashboardBibliotecario', async (req, res) => {
  res.render('dashboardBibliotecario');
});


module.exports = router;
