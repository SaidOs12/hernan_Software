const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');
const bcrypt = require('bcryptjs');
//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/actualizarEjemplar', async (req,res) =>{
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