const express = require('express');
const router = express.Router();

// Mostrar el dashboard del bibliotecario
router.get('/dashboardBibliotecario', async (req, res) => {
  res.render('dashboardBibliotecario');
});

// Mostrar lista de ejemplares
router.get('/ejemplares', async (req, res) => {
  // Aquí iría la lógica para obtener los ejemplares de la base de datos
  const ejemplares = await getEjemplaresFromDB(); // Simulación de función
  res.render('ejemplaresLista', { ejemplares });
});

// Agregar un ejemplar
router.post('/ejemplares/agregar', async (req, res) => {
  const { titulo, autor, isbn } = req.body;
  // Lógica para agregar el ejemplar a la base de datos
  await agregarEjemplar(titulo, autor, isbn); // Simulación de función
  res.redirect('/ejemplares');
});

// Eliminar un ejemplar
router.post('/ejemplares/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  // Lógica para eliminar el ejemplar de la base de datos
  await eliminarEjemplar(id); // Simulación de función
  res.redirect('/ejemplares');
});

// Modificar información de un ejemplar
router.post('/ejemplares/modificar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, isbn } = req.body;
  // Lógica para modificar el ejemplar en la base de datos
  await modificarEjemplar(id, titulo, autor, isbn); // Simulación de función
  res.redirect('/ejemplares');
});

// Registrar un préstamo
router.post('/prestamos', async (req, res) => {
  const { ejemplarId, usuarioId, fechaPrestamo } = req.body;
  // Lógica para registrar el préstamo
  await registrarPrestamo(ejemplarId, usuarioId, fechaPrestamo); // Simulación de función
  res.redirect('/prestamos');
});

// Registrar una devolución
router.post('/devoluciones', async (req, res) => {
  const { ejemplarId, usuarioId, fechaDevolucion } = req.body;
  // Lógica para registrar la devolución
  await registrarDevolucion(ejemplarId, usuarioId, fechaDevolucion); // Simulación de función
  res.redirect('/devoluciones');
});

const pool = require('../db'); // Asegúrate de que esta conexión está bien configurada

// Obtener todos los ejemplares
async function getEjemplaresFromDB() {
  const [rows] = await pool.query('SELECT * FROM ejemplares');
  return rows;
}

// Agregar un ejemplar
async function agregarEjemplar(titulo, autor, isbn) {
  const query = 'INSERT INTO ejemplares (titulo, autor, isbn) VALUES (?, ?, ?)';
  await pool.query(query, [titulo, autor, isbn]);
}

// Eliminar un ejemplar
async function eliminarEjemplar(id) {
  const query = 'DELETE FROM ejemplares WHERE id = ?';
  await pool.query(query, [id]);
}

// Modificar un ejemplar
async function modificarEjemplar(id, titulo, autor, isbn) {
  const query = 'UPDATE ejemplares SET titulo = ?, autor = ?, isbn = ? WHERE id = ?';
  await pool.query(query, [titulo, autor, isbn, id]);
}

// Registrar un préstamo
async function registrarPrestamo(ejemplarId, usuarioId, fechaPrestamo) {
  const query = 'INSERT INTO prestamos (ejemplar_id, usuario_id, fecha_prestamo) VALUES (?, ?, ?)';
  await pool.query(query, [ejemplarId, usuarioId, fechaPrestamo]);
}

// Registrar una devolución
async function registrarDevolucion(ejemplarId, usuarioId, fechaDevolucion) {
  const query = 'UPDATE prestamos SET fecha_devolucion = ? WHERE ejemplar_id = ? AND usuario_id = ?';
  await pool.query(query, [fechaDevolucion, ejemplarId, usuarioId]);
}


module.exports = router;
