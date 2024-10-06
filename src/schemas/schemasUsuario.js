const Joi = require('joi');

const schemasPersona = Joi.object({
  nombre: Joi.string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de caracteres.',
      'string.min': 'El nombre debe tener al menos 1 carácter.',
      'string.max': 'El nombre debe tener como máximo 50 caracteres.',
      'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),

  apellidos: Joi.string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    .required()
    .messages({
      'string.base': 'Los apellidos deben ser una cadena de caracteres.',
      'string.min': 'Los apellidos deben tener al menos 1 carácter.',
      'string.max': 'Los apellidos deben tener como máximo 50 caracteres.',
      'string.pattern.base': 'Los apellidos solo pueden contener letras y espacios.',
      'any.required': 'Los apellidos son un campo obligatorio.'
    }),

  fecha_nacimiento: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha de nacimiento debe ser una fecha válida.',
      'any.required': 'La fecha de nacimiento es un campo obligatorio.'
    }),

  telefono: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.base': 'El teléfono debe ser una cadena de caracteres.',
      'string.pattern.base': 'El teléfono solo puede contener números.',
      'any.required': 'El teléfono es un campo obligatorio.'
    }),

  direccion: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'La dirección debe ser una cadena de caracteres.',
      'string.max': 'La dirección debe tener como máximo 100 caracteres.',
      'any.required': 'La dirección es un campo obligatorio.'
    }),

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

  tipo_usuario: Joi.string()
    .valid('admin', 'bibliotecario', 'profesor', 'alumno')
    .required()
    .messages({
      'string.base': 'El tipo de usuario debe ser una cadena de caracteres.',
      'any.only': 'El tipo de usuario debe ser "admin", "bibliotecario", "profesor" o "alumno".',
      'any.required': 'El tipo de usuario es un campo obligatorio.'
    }),


  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'La contraseña debe ser una cadena de caracteres.',
      'string.min': 'La contraseña debe tener al menos 8 caracteres.',
      'any.required': 'La contraseña es un campo obligatorio.'
    }),

  ppassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'La confirmación de contraseña debe ser igual a la contraseña ingresada.',
      'any.required': 'La confirmación de contraseña es un campo obligatorio.'
    })
});

module.exports = schemasPersona;