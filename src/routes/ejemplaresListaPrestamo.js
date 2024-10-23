const express = require('express');
const router = express.Router();
const pool = require('../db');
const joi = require('joi');
const bcrypt = require('bcryptjs');

router.get('/ejemplaresListasPrestamo', async (req,res) =>{
  const prestamo = await pool.query('SELECT * FROM prestamo');
  res.render('page-ejemplaresListaPrestamo',  { prestamo });
});


router.post('/modificarEjemplarPrestamo', async (req,res) =>{
  try{
      const prestamo = await pool.query('SELECT * FROM prestamo WHERE idPrestamo  = ?', [req.body.idPrestamo]);
      res.render('page-modificacionEjemPrestamo',  { prestamo });
  }
  catch(error){
      console.error(error)
      res.send("ERROR EN LA PETICION" + error)
  }   
})

module.exports = router;