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
    
    // Verificar si la cédula ya existe en la base de datos
    const existeIDInv = await pool.query('SELECT * FROM ejemplar WHERE idInventario = ?', [req.body.idInventario]);
    const existeID = await pool.query('SELECT * FROM persona WHERE cedula = ?', [req.body.cedula]);
    const limitePres = await pool.query('SELECT * FROM prestamo WHERE cedula = ?', [req.body.cedula]);
    const diferenciaDias = Math.floor((req.body.fechaTope - req.body.fecha) / (1000 * 60 * 60 * 24));
    if (existeID.length == 0) {
      req.flash('error', 'La cedula no esta registrada');
      res.redirect('/registerPrestamo');
      return;
    }
    if(existeIDInv.length === 0){
      req.flash('error', 'La id del Ejemplar no esta registrado');
      res.redirect('/registerPrestamo');
    return;
    }
    if(existeIDInv[0].estado !== "Disponible"){
      req.flash('error', 'El ejemplar no se encuentra disponible');
      res.redirect('/registerPrestamo');
      return;
    }
    if(existeID[0].multado){
      req.flash('error', 'El usuario se encuentra multado');
      res.redirect('/registerPrestamo');
      return;
    }
    if((limitePres.length>=3 && existeID[0].tipo_usuario === "alumno") ||(limitePres.length>=5 && existeID[0].tipo_usuario === "profesor")){
      req.flash('error', 'El usuario tiene demasiados prestamos activos');
      res.redirect('/registerPrestamo');
      return;
    }
    const {
      idInventario,
      cedula,
      fecha,
      fechaTope
    } = req.body;
    const prestamo = {
      idInventario,
      cedula,
      fecha,
      fechaTope
    }
    console.log("BIEN")
    await pool.query('INSERT INTO prestamo SET ?', [prestamo]);
    await pool.query('UPDATE ejemplar SET estado = "Prestado" WHERE idInventario = ?', [req.body.idInventario]);
    req.flash('success', 'Prestado registrado correctamente');
    res.redirect('/registerPrestamo');
              
            
          

          
        
        
        
      
    
  } catch (error) {
    console.log("MAL")
    res.status(400).send('Error FATAL: ' + error);
  }
});

module.exports = router;