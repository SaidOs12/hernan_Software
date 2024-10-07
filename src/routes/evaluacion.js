const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');
const bcrypt = require('bcryptjs');
//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/unidadUnoAgregar', (req,res) =>{
    res.render('page-bancopreguntas');
})
//Inserta una nueva pregunta
router.post('/unidadUnoAgregar', async (req,res) =>{
    
    
    try{
        const busqueda = await pool.query('SELECT * FROM persona WHERE cedula  = ?', [req.body.cedula])
        if (busqueda.length!==0){
            const usuario = await pool.query('SELECT * FROM persona WHERE cedula  = ?', [req.body.cedula]);
            res.render('page-deleteuser',  { usuario });
        }else {
    
            req.flash('error', 'No se encontro ningun usuario con esa cedula registrada')
            res.redirect('/unidadUnoAgregar');
        }
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadUnoAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 1,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas1');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

module.exports = router;