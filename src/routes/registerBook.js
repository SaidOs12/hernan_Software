const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/agregarLibro', (req, res) => {
  res.render('agregarLibro');
});

router.post('/agregarLibro', async (req, res) => {
  try {
    console.log(req.body);
    /**const { error } = schemasPersona.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      res.redirect('/agregarLibro');
    }*/
    
    // Verificar si la cédula ya existe en la base de datos
    const existeID = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.idInventario]);
    if (existeID.length > 0) {
      req.flash('error', 'La id del Ejemplar ya esta registrado');
      res.redirect('/agregarLibro');
      return;
    }
    
    else {
      const {
        idInventario,
        nombre,
        fecha,
        estado,
        costoEjemplar,
        registroDaños,
        libroISBN,
        autor,
        editorial,
        año
      } = req.body;
      const ejemplar = {
        idInventario,
        nombre,
        fecha,
        estado,
        costoEjemplar,
        registroDaños,
        libroISBN,
        autor,
        editorial,
        año
      };
      
      console.log("BIEN")
      await pool.query('INSERT INTO ejemplar SET ?', [ejemplar]);
      req.flash('success', 'Usuario registrado correctamente');
      res.redirect('/agregarLibro');
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;