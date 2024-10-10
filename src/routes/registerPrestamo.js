const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/registroPrestamo', (req, res) => {
  res.render('registroPrestamo');
});

router.post('/registroPrestamo', async (req, res) => {
  try {
    console.log(req.body);
    /**const { error } = schemasPersona.validate(req.body);
    if (error) {
      req.flash('error', error.details[0].message);
      res.redirect('/agregarLibro');
    }*/
    
    // Verificar si la cédula ya existe en la base de datos
    const existeIDInv = await pool.query('SELECT * FROM ejemplar WHERE idInventario = ?', [req.body.idInventario]);
    const existeID = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.cedula]);
    if (existeID.length == 0) {
      req.flash('error', 'La cedula no se esta registrada');
      res.redirect('/registroPrestamo');
      return;
    }else{
      if(existeIDInv.length == 0){
        req.flash('error', 'La id del Ejemplar no esta registrado');
        res.redirect('/registroPrestamo');
      return;
      }else {
        if(existeIDInv.estado != "Disponible"){
          req.flash('error', 'El ejemplar no se encuentra disponible');
          res.redirect('/registroPrestamo');
        return;
        }else{
          if(existeID.estado != "Disponible"){

          }
        }
        
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
          año,
          
        };
        
        console.log("BIEN")
        await pool.query('INSERT INTO ejemplar SET ?', [ejemplar]);
        req.flash('success', 'Ejemplar registrado correctamente');
        res.redirect('/agregarLibro');
      }
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;