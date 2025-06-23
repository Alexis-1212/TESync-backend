const express = require('express');
const router = express.Router();
const crud = require('../controlador/alumno/alumnoCrud');
const materias = require('../controlador/alumno/alumnoMateria');
const auth = require('../controlador/alumno/autenticarAlumno');

// 📦 CRUD básico
router.post('/crear-alumno', crud.crearAlumno);
router.get('/obtener-alumnos', crud.obtenerAlumnos);
// Rutas actualizadas para usar matrícula
router.get('/obtener-alumno/:matricula', crud.obtenerAlumno);
router.put('/actualizar-alumno/:matricula', crud.actualizarAlumno);
router.delete('/eliminar-alumno/:matricula', crud.eliminarAlumno);
router.patch('/actualizar-grupo-alumno/:matricula', crud.actualizarGrupoAlumno);


/*
// 📚 Materias
router.post('/:id/materias', materias.agregarMateria);
router.get('/:id/materias', materias.obtenerMateriasAlumno);
*/
// 🔐 Autenticación
router.post('/login', auth.autenticarAlumno);

module.exports = router;
