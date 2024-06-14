const joi = require('joi');

const schemasPreguntas = joi.object({
  dificultad: joi.number()
    .min(1)
    .max(3)
    .required()
    .messages({
      'number.base': 'La dificultad debe ser un número.',
      'number.min': 'La dificultad debe ser como mínimo 1.',
      'number.max': 'La dificultad debe ser como máximo 3.',
      'any.required': 'La dificultad es un campo obligatorio.'
    }),

  tipoPregunta: joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .valid('SELECTUNIC', 'SELECTMULTI')
    .required()
    .messages({
      'string.base': 'El tipo de pregunta debe ser una cadena de caracteres.',
      'string.pattern.base': 'El tipo de pregunta solo puede contener letras mayúsculas, minúsculas y números.',
      'any.only': 'El tipo de pregunta debe ser uno de los valores permitidos: SELECTUNIC o SELECTMULTI.',
      'any.required': 'El tipo de pregunta es un campo obligatorio.'
    }),
enunciado: joi.string(),
  opciona: joi.string()
    .min(1)
    .max(112)
    .required()
    .regex(/^[a-zA-Z0-9]*$/)
    .messages({
      'string.base': 'La opción A debe ser una cadena de caracteres.',
      'string.min': 'La opción A debe tener al menos 1 carácter.',
      'string.max': 'La opción A debe tener como máximo 112 caracteres.',
      'string.pattern.base': 'La opción A solo puede contener letras mayúsculas, minúsculas y números.',
      'any.required': 'La opción A es un campo obligatorio.'
    }),

  opcionb: joi.string()
    .min(1)
    .max(112)
    .invalid(joi.ref('opciona'))
    .required()
    .messages({
      'string.base': 'La opción B debe ser una cadena de caracteres.',
      'string.min': 'La opción B debe tener al menos 1 carácter.',
      'string.max': 'La opción B debe tener como máximo 112 caracteres.',
      'any.invalid': 'La opción B no puede ser igual a la opción A.',
      'any.required': 'La opción B es un campo obligatorio.'
    }),

  opcionc: joi.string()
    .min(1)
    .max(112)
    .invalid(joi.ref('opciona'), joi.ref('opcionb'))
    .required()
    .messages({
      'string.base': 'La opción C debe ser una cadena de caracteres.',
      'string.min': 'La opción C debe tener al menos 1 carácter.',
      'string.max': 'La opción C debe tener como máximo 112 caracteres.',
      'any.invalid': 'La opción C no puede ser igual a la opción A ni a la opción B.',
      'any.required': 'La opción C es un campo obligatorio.'
    }),

  opciond: joi.string()
    .min(1)
    .max(112)
    .invalid(joi.ref('opciona'), joi.ref('opcionb'), joi.ref('opcionc'))
    .required()
    .messages({
      'string.base': 'La opción D debe ser una cadena de caracteres.',
      'string.min': 'La opción D debe tener al menos 1 carácter.',
      'string.max': 'La opción D debe tener como máximo 112 caracteres.',
      'any.invalid': 'La opción D no puede ser igual a la opción A, opción B ni opción C.',
      'any.required': 'La opción D es un campo obligatorio.'
    }),

  respuestaCorrecta: joi.string()
    .when('tipoPregunta', {
      is: joi.exist().valid('SELECTUNIC'),
      then: joi.string()
        .valid(joi.ref('opciona'), joi.ref('opcionb'), joi.ref('opcionc'), joi.ref('opciond'))
        .invalid(joi.ref('opcionA'), joi.ref('opcionB'), joi.ref('opcionC'))
        .required()
        .messages({
          'string.base': 'La respuesta correcta debe ser una cadena de caracteres.',
          'any.only': 'Cuando el tipo de pregunta es SELECTUNIC, la respuesta correcta debe ser igual a una de las opciones A, B, C o D.',
          'any.invalid': 'Cuando el tipo de pregunta es SELECTUNIC, la respuesta correcta no puede ser igual a las opciones A, B ni C.',
          'any.required': 'La respuesta correcta es un campo obligatorio cuando el tipo de pregunta es SELECTUNIC.'
        }),
      otherwise: joi.forbidden()
    }),

  retroalimentacion: joi.string()
    .min(1)
    .max(1024)
    .required()
    .messages({
      'string.base': 'La retroalimentación debe ser una cadena de caracteres.',
      'string.min': 'La retroalimentación debe tener al menos 1 carácter.',
      'string.max': 'La retroalimentación debe tener como máximo 1024 caracteres.',
      'any.required': 'La retroalimentación es un campo obligatorio.'
    })
});


module.exports = schemasPreguntas;