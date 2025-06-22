// crearAlumno: POST /api/alumnos
exports.crearAlumno = async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// obtenerAlumnos: GET /api/alumnos
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('calificaciones.materia');
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// obtenerAlumno: GET /api/alumnos/:id
exports.obtenerAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id).populate('calificaciones.materia');
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// actualizarAlumno: PUT /api/alumnos/:id
exports.actualizarAlumno = async (req, res) => {
  try {
    const actualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// eliminarAlumno: DELETE /api/alumnos/:id
exports.eliminarAlumno = async (req, res) => {
  try {
    await Alumno.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
