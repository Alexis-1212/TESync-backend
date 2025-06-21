const express = require('express');
const router = express.Router();

// GET /api/maestros - lista profesores
router.get('/', (req, res) => {
  res.send('Lista de profesores');
});

// POST /api/maestros - crear profesor
router.post('/', (req, res) => {
  const nuevoProfesor = req.body; // aquí lógica para guardar en DB
  res.status(201).json({ mensaje: 'Profesor creado', profesor: nuevoProfesor });
});

module.exports = router;
