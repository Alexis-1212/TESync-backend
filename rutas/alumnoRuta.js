const express = require('express');
const router = express.Router();
const crud = require('../controlador/alumno/alumnoCrud');
const materias = require('../controlador/alumno/alumnoMateria');
const auth = require('../controlador/alumno/autenticarAlumno');

// 📦 CRUD básico
router.post('/', crud.crearAlumno);
router.get('/', crud.obtenerAlumnos);
router.get('/:id', crud.obtenerAlumno);
router.put('/:id', crud.actualizarAlumno);
router.delete('/:id', crud.eliminarAlumno);

// 📚 Materias
router.post('/:id/materias', materias.agregarMateria);
router.get('/:id/materias', materias.obtenerMateriasAlumno);

// 🔐 Autenticación
router.post('/login', auth.autenticarAlumno);

module.exports = router;
