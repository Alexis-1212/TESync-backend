const Alumno = require('../../modelos/alumno');

// Obtener todos los alumnos
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('calificaciones.materia');
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los alumnos', error });
  }
};

// Obtener un alumno por ID
exports.obtenerAlumnoPorId = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id).populate('calificaciones.materia');
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el alumno', error });
  }
};

// Crear un nuevo alumno
exports.crearAlumno = async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el alumno', error });
  }
};

// Actualizar un alumno existente
exports.actualizarAlumno = async (req, res) => {
  try {
    const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumnoActualizado) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumnoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el alumno', error });
  }
};

// Eliminar un alumno
exports.eliminarAlumno = async (req, res) => {
  try {
    const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
    if (!alumnoEliminado) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el alumno', error });
  }
};

// Agregar calificación a un alumno
exports.agregarCalificacion = async (req, res) => {
  try {
    const { materia, unidades, final } = req.body;
    const alumno = await Alumno.findById(req.params.id);

    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    alumno.calificaciones.push({ materia, unidades, final });
    await alumno.save();

    res.status(201).json(alumno);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al agregar la calificación', error });
  }
};
