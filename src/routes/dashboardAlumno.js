const express = require('express');
const router = express.Router();

// Mostrar el dashboard del bibliotecario
router.get('/dashboardAlumno', async (req, res) => {
  res.render('dashboardAlumno');
});


module.exports = router;
