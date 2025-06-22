const express = require('express');
const router = express.Router();
const crud = require('../controlador/maestro/maestroCrud');

// 📦 CRUD básico de maestros
router.post('/crear-maestro', crud.crearMaestro);
router.get('/obtener-maestros', crud.obtenerMaestros);
router.get('/obtener-maestro/:id', crud.obtenerMaestro);
router.put('/actualizar-maestro/:id', crud.actualizarMaestro);
router.delete('/eliminar-maestro/:id', crud.eliminarMaestro);

module.exports = router;
