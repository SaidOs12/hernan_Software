const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const schemasPersona = require('../schemas/schemasUsuario');

router.get('/registerPrestamo', (req, res) => {
  res.render('registerPrestamo');
});

router.post('/registerPrestamo', async (req, res) => {
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
    const limitePres = await pool.query('SELECT * FROM prestamo WHERE cedula = ?', [req.body.cedula]);
    const fecDev = null;
              const multa = false;
              const {
                idPrestamo,
                idInventario,
                cedula,
                fecha,
                fechaTope,
              } = req.body;
              const prestamo = {
                idPrestamo,
                idInventario,
                cedula,
                fecha,
                fechaTope,
                fecDev,
                multa,
              }
    if (existeID.length == 0) {
      req.flash('error', 'La cedula no esta registrada');
      res.redirect('/registerPrestamo');
      return;
    }else{
      if(existeIDInv.length == 0){
        req.flash('error', 'La id del Ejemplar no esta registrado');
        res.redirect('/registerPrestamo');
      return;
      }else {
        if(prestamo.estado != "Disponible"){
          req.flash('error', 'El ejemplar no se encuentra disponible');
          res.redirect('/registerPrestamo');
          return;
        }else{
          if(existeID.multado){
            req.flash('error', 'El usuario se encuentra multado');
            res.redirect('/registerPrestamo');
            return;
          }else{
            if((limitePres.length>=3 && existeID.tipo_usuario == "alumno") ||(limitePres.length>=5 && existeID.tipo_usuario == "profesor")){
              req.flash('error', 'El usuario tiene demasiados prestamos activos');
              res.redirect('/registerPrestamo');
              return;
            }else{
              console.log("BIEN")
              await pool.query('INSERT INTO prestamo SET ?', [prestamo]);
              req.flash('success', 'Prestado registrado correctamente');
              res.redirect('/registerPrestamo');
              
            }
          }

          
        };
        
        
      }
    }
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;