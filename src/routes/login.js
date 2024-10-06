const express = require('express');
const pool = require('../db');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
  res.render('login');
});

router.post('/login', async (req,res) =>{

 
  const busqueda = await pool.query('SELECT * FROM persona WHERE cedula  = ?', [req.body.cedula])
  
  if (busqueda.length!==0) {
    console.log(busqueda)
    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
    if (bcrypt.compareSync(req.body.password, busqueda[0].contrasena)) {
      
      
      req.flash('success', 'Bienvenido usuario: ' +  busqueda[0].cedula)
      sessionStorage.setItem('userLogged', data[0]['cedula']);
      if (busqueda[0].tipo_usuario === "admin") {
        res.redirect('/dashboard');
      } else if (busqueda[0].tipo_usuario === "bibliotecario") {
          res.redirect('/dashboardBibliotecario');
      } else if (busqueda[0].tipo_usuario === "alumno") {
        res.redirect('/dashboardAlumno');
      } else if (busqueda[0].tipo_usuario === "profesor") {
        res.redirect('/dashboardProfesor');
      }
    } else {
      
      req.flash('error', 'La contraseña es incorrecta, ¿olvidaste tu contraseña?')
      res.redirect('/login');
    }
  } else {
    
      req.flash('error', 'No se encontro ningun usuario con el correo electronico')
      res.redirect('/login');
  }
  }) 
  module.exports = router;
