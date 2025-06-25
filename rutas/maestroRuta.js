const express = require('express');
const router = express.Router();

const crud = require('../controlador/maestro/maestroCrud');
const auth = require('../controlador/maestro/authenticarMaestro');
const materias = require('../controlador/maestro/maestroMateria');
const calificaciones = require('../controlador/maestro/maestroCalificaciones');

// 🔎 Obtener calificaciones de una unidad y final por materia y grupo (solo las del maestro)
router.get('/calificaciones/:cedula/:claveMateria/:grupo/:unidad',calificaciones.obtenerCalificacionesPorUnidadYGrupo);

// 👀 Ver todas las relaciones maestro-materia-grupo
router.get('/relaciones', materias.verRelaciones);


// 📚 Obtener materias que tiene un maestro
router.get('/materias/:cedula', materias.verMateriasDeMaestro);



// CRUD básico de maestros
router.post('/crear-maestro', crud.crearMaestro);
router.get('/obtener-maestros', crud.obtenerMaestros);
router.get('/obtener-maestro/:cedula', crud.obtenerMaestro);
router.put('/actualizar-maestro/:cedula', crud.actualizarMaestro);
router.delete('/eliminar-maestro/:cedula', crud.eliminarMaestro);

// 🔐 Autenticación de maestros
router.post('/login', auth.autenticarMaestro);

// 📚 Asignar materia a maestro (relación)
router.post('/asignar-materia', materias.crearRelacion);

//eliminar relación entre maestro y materia
router.delete('/eliminar-materia', materias.eliminarRelacion); 
// editar relación entre maestro y materia
router.put('/editar-relacion', materias.editarRelacion);


module.exports = router;
