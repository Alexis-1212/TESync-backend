const express = require('express');
const router = express.Router();
const crud = require('../controlador/materia/materiaCrud');

// 📦 CRUD básico para Materia
router.post('/crear-materia', crud.crearMateria);
router.get('/obtener-materias', crud.obtenerMaterias);
router.get('/obtener-materia/:clave', crud.obtenerMateria);
router.put('/actualizar-materia/:clave', crud.actualizarMateria);
router.delete('/eliminar-materia/:clave', crud.eliminarMateria);
router.patch('/actualizar-estado/:clave', crud.actualizarEstadoMateria);

// Obtener solo los nombres de las materias
router.get('/nombres-materias', crud.obtenerNombresMaterias);


module.exports = router;
