const express = require('express');
const router = express.Router();
const crud = require('../controlador/alumno/alumnoCrud');
const materias = require('../controlador/alumno/alumnoMateria');
const auth = require('../controlador/alumno/autenticarAlumno');

// 📦 CRUD básico
router.post('/crear-alumno', crud.crearAlumno);
router.get('/obtener-alumnos', crud.obtenerAlumnos);
router.get('/obtener-alumno:id', crud.obtenerAlumno);
router.put('/actualizar-alumno:id', crud.actualizarAlumno);
router.delete('/eliminar-alumno:id', crud.eliminarAlumno);
router.patch('/actualizar-grupo-alumno:id', crud.actualizarGrupoAlumno);

/*
// 📚 Materias
router.post('/:id/materias', materias.agregarMateria);
router.get('/:id/materias', materias.obtenerMateriasAlumno);
*/
// 🔐 Autenticación
router.post('/login', auth.autenticarAlumno);

module.exports = router;
