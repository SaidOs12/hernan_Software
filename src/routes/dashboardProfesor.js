const express = require('express');
const router = express.Router();

// Mostrar el dashboard del bibliotecario
router.get('/dashboardProfesor', async (req, res) => {
  res.render('dashboardProfesor');
});


module.exports = router;
