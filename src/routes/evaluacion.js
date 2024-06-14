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

//Consulta todas las preguntas de la base de datos
router.get('/bancoPreguntas1',  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta');
    console.log(pregunta);
    
    res.render('respuestaslist', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Consulta una pregunta especifica del banco de  Preguntas
router.get('/bancoPreguntas1/:id',  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        const pregunta =  await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        console.log(pregunta);
       
        
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Eliminar una pregunta del banco de  Preguntas
router.get('/eliminarPregunta/:id',  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        const pregunta = await pool.query('DELETE FROM pregunta WHERE idpregunta  = ?', [id]);
        const value = pregunta.affectedRows
        if(value==1){
            req.flash('success', 'Pregunta eliminada con exito')
            res.redirect('/bancoPreguntas1');
        }
        else{
            req.flash('error', 'Pregunta con id: ' + id + ' no existe en la base de datos')
            res.redirect('/bancoPreguntas1');
        }
    }
    

catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Obtener el objeto de una pregunta para editar en un formulario
router.get('/editarPregunta/:id',  async (req,res) =>{
    try{

        const id = req.params.id;
        console.log(id);
        const preguntas = await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        if(JSON.stringify(preguntas)=="[]"){
            res.status(400).send("No existe dicha pregunta en la base de datos")
        }
        else{
        //res.render('evaluaciones/evaluacion1_Edit.hbs', {preguntas: preguntas[0]});
        res.status(200).send({preguntas: preguntas[0]});
        }
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}}) 

//Actualizar la pregunta
router.post('/editarPregunta/:id', async (req,res) =>{

    try{

    const { error } = schemasPreguntas.validate(req.body) ;
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    else {
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const nuevaPregunta = {
        idEvaAsoc: 1 ,
        dificultad, 
        tipoPregunta, 
        enunciado, 
        opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond, 
        respuestaCorrecta, 
        retroalimentacion
    }
    const id = req.params.id;
    console.log(id);
    await pool.query('UPDATE pregunta SET ?  WHERE idpregunta  = ?', [nuevaPregunta, id])
    res.send("Pregunta Actualizada de manera exitosa");
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

module.exports = router;