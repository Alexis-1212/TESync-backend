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
router.patch('/actualizar-grupo-alumno/:matricula', crud.actualizarGrupoAlumno);

// Calificaciones por materia (registro, edición, eliminación, consulta)
router.post('/:matricula/calificaciones/:clave', calificaciones.agregarCalificacionMateria); // Agregar calificación
router.put('/:matricula/calificaciones/:clave', calificaciones.editarCalificacionMateria);   // Editar calificación
router.delete('/:matricula/calificaciones/:clave', calificaciones.eliminarCalificacionMateria); // Eliminar calificación

// Consulta
router.get('/:matricula/calificaciones', calificaciones.obtenerCalificacionesAlumno); // Ver todas
router.get('/:matricula/calificaciones/:clave', calificaciones.obtenerCalificacionMateriaEspecifica); // Ver una específica



// 🔐 Autenticación
router.post('/login', auth.autenticarAlumno);

module.exports = router;
