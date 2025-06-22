const express = require('express');
const router = express.Router();
const maestro = require('../controllers/maestroController');

// 📦 CRUD básico de maestros
router.post('/crear-maestro', maestro.crearMaestro);
router.get('/obtener-maestros', maestro.obtenerMaestros);
router.get('/obtener-maestro:id', maestro.obtenerMaestro);
router.put('/actualizar-maestro:id', maestro.actualizarMaestro);
router.delete('/eliminar-maestro:id', maestro.eliminarMaestro);

// Si deseas agregar más funciones (como materias, autenticación, etc.), aquí puedes expandir.

module.exports = router;
