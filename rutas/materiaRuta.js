const express = require('express');
const router = express.Router();

// GET /api/materias - lista materias
router.get('/', (req, res) => {
  res.send('Lista de materias');
});

// POST /api/materias - crear materia
router.post('/', (req, res) => {
  const nuevaMateria = req.body; // aquí lógica para guardar en DB
  res.status(201).json({ mensaje: 'Materia creada', materia: nuevaMateria });
});

module.exports = router;
