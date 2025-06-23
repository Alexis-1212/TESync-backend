const express = require('express');
const router = express.Router();
const crud = require('../controlador/maestro/maestroCrud');

// 📦 CRUD básico de maestros
router.post('/crear-maestro', crud.crearMaestro);
router.get('/obtener-maestros', crud.obtenerMaestros);
router.get('/obtener-maestro/:matricula', crud.obtenerMaestro);
router.put('/actualizar-maestro/:matricula', crud.actualizarMaestro);
router.delete('/eliminar-maestro/:matricula', crud.eliminarMaestro);

module.exports = router;

