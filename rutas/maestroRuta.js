const express = require('express');
const router = express.Router();
const crud = require('../controlador/maestro/maestroCrud');
//const materias = require('../controlador/maestro/maestroMateria');
const auth = require('../controlador/maestro/authenticarMaestro');

// 📦 CRUD básico de maestros
router.post('/crear-maestro', crud.crearMaestro);
router.get('/obtener-maestros', crud.obtenerMaestros);
router.get('/obtener-maestro/:cedula', crud.obtenerMaestro);
router.put('/actualizar-maestro/:cedula', crud.actualizarMaestro);
router.delete('/eliminar-maestro/:cedula', crud.eliminarMaestro);

// Materias asignadas al maestro
//router.get('/materias/:matricula', materias.verMateriasDeMaestro);
// 🔐 Autenticación de maestros
router.post('/login', auth.autenticarMaestro);

module.exports = router;

