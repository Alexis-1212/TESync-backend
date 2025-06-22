const express = require('express');
const router = express.Router();
const crud = require('../controlador/materia/materiaCrud');

// 📦 CRUD básico para Materia
router.post('/crear-materia', crud.crearMateria);
router.get('/obtener-materias', crud.obtenerMaterias);
router.get('/obtener-materia/:id', crud.obtenerMateria);
router.put('/actualizar-materia/:id', crud.actualizarMateria);
router.delete('/eliminar-materia/:id', crud.eliminarMateria);

module.exports = router;
