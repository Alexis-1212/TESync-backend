const Alumno = require('../../modelos/alumno');

// Crear alumno
exports.crearAlumno = async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los alumnos
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('calificaciones.materia');
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener alumno por matrícula
exports.obtenerAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findOne({ matricula: req.params.matricula }).populate('calificaciones.materia');
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar alumno por matrícula
exports.actualizarAlumno = async (req, res) => {
  try {
    const actualizado = await Alumno.findOneAndUpdate(
      { matricula: req.params.matricula },
      req.body,
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar alumno por matrícula
exports.eliminarAlumno = async (req, res) => {
  try {
    const eliminado = await Alumno.findOneAndDelete({ matricula: req.params.matricula });
    if (!eliminado) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar grupo por matrícula
exports.actualizarGrupoAlumno = async (req, res) => {
  try {
    const { grupo } = req.body;
    if (!grupo) return res.status(400).json({ error: 'El grupo es requerido' });

    const actualizado = await Alumno.findOneAndUpdate(
      { matricula: req.params.matricula },
      { grupo },
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ error: 'Alumno no encontrado' });

    res.json({ mensaje: 'Grupo actualizado correctamente', alumno: actualizado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
