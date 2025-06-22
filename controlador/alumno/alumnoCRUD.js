console.log('📦 Cargando modelo Alumno...');
const Alumno = require('../../modelos/alumno');
console.log('✅ Modelo Alumno cargado:', typeof Alumno);


exports.crearAlumno = async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('calificaciones.materia');
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.obtenerAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id).populate('calificaciones.materia');
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.actualizarAlumno = async (req, res) => {
  try {
    const actualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.eliminarAlumno = async (req, res) => {
  try {
    const eliminado = await Alumno.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.actualizarGrupoAlumno = async (req, res) => {
  try {
    const { grupo } = req.body;

    if (!grupo) return res.status(400).json({ error: 'El grupo es requerido' });

    const actualizado = await Alumno.findByIdAndUpdate(
      req.params.id,
      { grupo },
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ error: 'Alumno no encontrado' });

    res.json({ mensaje: 'Grupo actualizado correctamente', alumno: actualizado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
