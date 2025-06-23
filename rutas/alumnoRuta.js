const express = require('express');
const router = express.Router();

const crud = require('../controlador/alumno/alumnoCrud');
const materias = require('../controlador/alumno/alumnoMateria');
const auth = require('../controlador/alumno/autenticarAlumno');
const calificaciones = require('../controlador/alumno/alumnoCalificaciones');

// 📦 CRUD básico
router.post('/crear-alumno', crud.crearAlumno);
router.get('/obtener-alumnos', crud.obtenerAlumnos);
router.get('/obtener-alumno/:matricula', crud.obtenerAlumno);
router.put('/actualizar-alumno/:matricula', crud.actualizarAlumno);
router.delete('/eliminar-alumno/:matricula', crud.eliminarAlumno);

// 📚 Materias
router.post('/:matricula/materias', materias.agregarMateria);
router.get('/:matricula/materias', materias.obtenerMateriasAlumno);

// 🔐 Autenticación
router.post('/login', auth.autenticarAlumno);

// 🧮 Calificaciones
router.post('/:matricula/calificaciones/:clave', calificaciones.agregarCalificacionMateria);
router.put('/:matricula/calificaciones/:clave', calificaciones.editarCalificacionMateria);
router.delete('/:matricula/calificaciones/:clave', calificaciones.eliminarCalificacionMateria);
router.get('/:matricula/calificaciones', calificaciones.obtenerCalificacionesAlumno);
router.get('/:matricula/calificaciones/:clave', calificaciones.obtenerCalificacionMateriaEspecifica);

module.exports = router;
