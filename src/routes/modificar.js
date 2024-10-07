const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/page-modificacion', async (req, res) => {
  res.render('page-modificacion');
});

router.post('/page-modificacion', async (req, res) => {
  try {
    
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/page-actualizar');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la petición: " + error.message);
  }
});

module.exports = router;