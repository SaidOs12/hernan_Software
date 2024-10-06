const Joi = require('joi');

const schemasPersona = Joi.object({
  cedula: Joi.string()
    .pattern(/^\d+$/)
    .max(20)
    .required()
    .messages({
      'string.base': 'La cédula debe ser una cadena de caracteres.',
      'string.pattern.base': 'La cédula solo puede contener números.',
      'string.max': 'La cédula debe tener como máximo 20 caracteres.',
      'any.required': 'La cédula es un campo obligatorio.'
    }),
});

module.exports = schemasPersona;