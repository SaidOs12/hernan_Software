const express = require('express');
const router = express.Router();
const pool = require('../db');
const joi = require('joi');
const bcrypt = require('bcryptjs');

router.get('/ejemplaresListas', async (req,res) =>{
  const ejemplar = await pool.query('SELECT * FROM ejemplar');
  res.render('page-ejemplaresLista',  { ejemplar });
});


router.post('/modificarEjemplar', async (req,res) =>{
  try{
      const ejemplar = await pool.query('SELECT * FROM ejemplar WHERE idInventario  = ?', [req.body.idInventario]);
      res.render('page-modificacionEjem',  { ejemplar });
  }
  catch(error){
      console.error(error)
      res.send("ERROR EN LA PETICION" + error)
  }   
})

module.exports = router;