const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');
const bcrypt = require('bcryptjs');
//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/page-actualizar', (req,res) =>{
    res.render('page-actualizar');
})
//Inserta una nueva pregunta
router.post('/page-actualizar', async (req,res) =>{
    
    
    try{
        const busqueda = await pool.query('SELECT * FROM persona WHERE cedula  = ?', [req.body.cedula])
        if (busqueda.length!==0){
            const usuario = await pool.query('SELECT * FROM persona WHERE cedula  = ?', [req.body.cedula]);
            res.render('page-modificacion',  { usuario });
        }else {
    
            req.flash('error', 'No se encontro ningun usuario con esa cedula registrada')
            res.redirect('/page-actualizar');
        }
    }
    catch(error){
        console.error(error)
        res.send("ERROR EN LA PETICION" + error)
    }    
})

module.exports = router;