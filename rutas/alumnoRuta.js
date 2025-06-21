const express = require('express');
const router = express.Router();

// GET /api/alumnos - lista alumnos
router.get('/', (req, res) => {
  res.send('Lista de alumnos');
});

// POST /api/alumnos - crear alumno
router.post('/', (req, res) => {
  const nuevoAlumno = req.body; // aquí iría lógica para guardar en DB
  res.status(201).json({ mensaje: 'Alumno creado', alumno: nuevoAlumno });
});

module.exports = router;
