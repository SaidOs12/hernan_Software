const Handlebars = require('handlebars');

// Registro del helper
Handlebars.registerHelper('splitOptions', function(optionsString) {
  // Verificar si se proporciona una cadena de opciones
  if (!optionsString || typeof optionsString !== 'string') {
    return '';
  }

  // Separar las opciones usando el carácter ";"
  var optionsArray = optionsString.split(';');

  // Ordenar de forma aleatoria las opciones
  optionsArray.sort(function() {
    return 0.5 - Math.random();
  });

  // Retornar el arreglo de opciones
  return optionsArray;
});

// Exportar Handlebars para usar en tu vista
module.exports = Handlebars;