const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');

// api/materias
router.post('/', materiaController.crearMateria);
router.get('/', materiaController.obtenerMaterias);
router.get('/:id', materiaController.obtenerMateria);
router.put('/:id', materiaController.actualizarMateria);
router.delete('/:id', materiaController.eliminarMateria);

module.exports = router;
