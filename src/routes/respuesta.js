const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');

//Inserta una nueva respuesta
router.post('/unidad17eva', async (req,res) =>{
    try{

        const  objRespuesta =
        {
            valorRespuesta: req.body.valorRespuesta, 
            estado: 0,
            idPreguntaAsociada: req.body.idPreguntaAsociada,
            valorRespuesta2: req.body.valorRespuesta2, 
            estado2: 0,
            idPreguntaAsociada2:req.body.idPreguntaAsociada2,
            valorRespuesta3:req.body.valorRespuesta3, 
            estado3:0,  
           idPreguntaAsociada3:req.body.idPreguntaAsociada3,
            valorRespuesta4:req.body.valorRespuesta4, 
            estado4:0,
            idPreguntaAsociada4:req.body.idPreguntaAsociada4,
            valorRespuesta5:req.body.valorRespuesta5, 
            estado5:0,
            idPreguntaAsociada5:req.body.idPreguntaAsociada5,
            idUsuarioResponsable:0,
            puntaje:0
            }

        console.log("32", req.body)
        const validator =  await pool.query ('SELECT respuestaCorrecta, idpregunta FROM pregunta WHERE respuestaCorrecta = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta, req.body.idPreguntaAsociada, req.body.idUsuarioResponsable])
        if(JSON.stringify(validator)=="[]"){
            console.log("Esta opcion de respuesta es inexiste   nte, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
            //res.status(400).send("Respuesta Incorrecta");
            objRespuesta.estado=0
            console.log(objRespuesta.estado);
        }
        else{   
            const validator =  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta])
            if(JSON.stringify(validator)=="[]"){
                objRespuesta.estado=0
                console.log("Respuesta Incorrecta")
                //res.status(400).send("Respuesta Incorrecta");
        }
        else{
            console.log("Respuesta Correcta")
            objRespuesta.estado=1;
            objRespuesta.puntaje= objRespuesta.puntaje + 20;
            //res.status(200).send("Respuesta Correcta");
        }}


        const validator2 =  await pool.query ('SELECT respuestaCorrecta, idpregunta FROM pregunta WHERE respuestaCorrecta = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta2, req.body.idPreguntaAsociada2, req.body.idUsuarioResponsable])
        if(JSON.stringify(validator2)=="[]"){
            objRespuesta.estado2=0
            console.log("Esta opcion de respuesta es inexistente, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
            //res.status(400).send("Respuesta Incorrecta");
        }
        else{   
            const validator2 =  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta2])
            if(JSON.stringify(validator2)=="[]"){
                objRespuesta.estado2=0
                console.log("Respuesta Incorrecta")
                //res.status(400).send("Respuesta Incorrecta");
        }
        else{
            objRespuesta.estado2=1
            objRespuesta.puntaje= objRespuesta.puntaje + 20;
            console.log("Respuesta Correcta")
            //res.status(200).send("Respuesta Correcta");
        }}

        const validator3 =  await pool.query ('SELECT respuestaCorrecta, idpregunta FROM pregunta WHERE respuestaCorrecta = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta3, req.body.idPreguntaAsociada3, req.body.idUsuarioResponsable])
        if(JSON.stringify(validator3)=="[]"){
            objRespuesta.estado3=0
            console.log("Esta opcion de respuesta es inexistente, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
            //res.status(400).send("Respuesta Incorrecta");
        }
        else{   
            const validator3 =  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta3])
            if(JSON.stringify(validator3)=="[]"){
                objRespuesta.estado3=0
                console.log("Respuesta Incorrecta")
                //res.status(400).send("Respuesta Incorrecta");
        }
        else{
            objRespuesta.estado3=1
            objRespuesta.puntaje= objRespuesta.puntaje + 20;
            console.log("Respuesta Correcta")
            //res.status(200).send("Respuesta Correcta");
        }}


        const validator4=  await pool.query ('SELECT respuestaCorrecta, idpregunta FROM pregunta WHERE respuestaCorrecta = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta4, req.body.idPreguntaAsociada4, req.body.idUsuarioResponsable])
        if(JSON.stringify(validator4)=="[]"){
            objRespuesta.estado4=0
            console.log("Esta opcion de respuesta es inexistente, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
            //res.status(400).send("Respuesta Incorrecta");
        }
        else{   
            objRespuesta.estado4=0
            const validator4 =  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta4])
            if(JSON.stringify(validator4)=="[]"){
                console.log("Respuesta Incorrecta")
                //res.status(400).send("Respuesta Incorrecta");
        }
        else{
            objRespuesta.estado4=1
            objRespuesta.puntaje= objRespuesta.puntaje + 20;
            console.log("Respuesta Correcta")
            //res.status(200).send("Respuesta Correcta");
        }}

        const validator5=  await pool.query ('SELECT respuestaCorrecta, idpregunta FROM pregunta WHERE respuestaCorrecta = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta5, req.body.idPreguntaAsociada5, req.body.idUsuarioResponsable])
        if(JSON.stringify(validator5)=="[]"){
            objRespuesta.estado5=0
            console.log("Esta opcion de respuesta es inexistente, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
            //res.status(400).send("Respuesta Incorrecta");
        }
        else{   
            const validator5=  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta5])
            if(JSON.stringify(validator5)=="[]"){
                objRespuesta.estado5=0
                console.log("Respuesta Incorrecta")
                //res.status(400).send("Respuesta Incorrecta");
        }
        else{
            objRespuesta.estado5=1
            objRespuesta.puntaje= objRespuesta.puntaje + 20;
            console.log("Respuesta Correcta")
            //res.status(200).send("Respuesta Correcta");
        }}

        const respuesta = await pool.query('INSERT INTO respuesta set ?', [objRespuesta])
        const respuesta2 = await pool.query('UPDATE usuario SET progreso = 80 WHERE idUsuario = 100023')
        console.log(objRespuesta);
        if(objRespuesta.puntaje == 100){
        req.flash('success', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, eres muy inteligente');
        res.redirect('/dashboard');
    }
    if(objRespuesta.puntaje == 80){
        req.flash('success', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, muy bien superaste la meta');
        res.redirect('/dashboard');
    }
    if(objRespuesta.puntaje == 60){
        req.flash('success', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, bien pero puedes mejorar');
        res.redirect('/dashboard');
    }
    if(objRespuesta.puntaje == 40){
        req.flash('error', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, muy cerca pero puedes mejorar');
        res.redirect('/dashboard');
    }
    if(objRespuesta.puntaje == 20){
        req.flash('error', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, puedes mejorar');
        res.redirect('/dashboard');
    }
    if(objRespuesta.puntaje == 0){
        req.flash('error', 'Sacaste: ' + objRespuesta.puntaje + ' puntos de 100 posibles, se aprende del fracaso, del exito no mucho');
        res.redirect('/dashboard');
    }

}
 
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})

router.get('/bancoRespuestas',  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM respuesta');
    console.log(pregunta);
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    res.send(pregunta);
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}}) 
module.exports = router;
