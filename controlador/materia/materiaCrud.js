const Maestro = require('../modelos/Maestro');

// Crear profesor
exports.crearProfesor = async (req, res) => {
  try {
    const nuevo = new Maestro(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los profesores
exports.obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Maestro.find().populate('materias');
    res.json(profesores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un profesor por ID
exports.obtenerProfesor = async (req, res) => {
  try {
    const profesor = await Maestro.findById(req.params.id).populate('materias');
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.json(profesor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar profesor
exports.actualizarProfesor = async (req, res) => {
  try {
    const actualizado = await Maestro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar profesor
exports.eliminarProfesor = async (req, res) => {
  try {
    await Maestro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Profesor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Asignar materias a un profesor
exports.asignarMaterias = async (req, res) => {
  try {
    const { idProfesor, materias } = req.body;
    const profesor = await Maestro.findById(idProfesor);
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });

    profesor.materias.push(...materias);
    const actualizado = await profesor.save();
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Eliminar una materia de un profesor
exports.eliminarMateriaProfesor = async (req, res) => {
  try {
    const { idProfesor, idMateria } = req.body;
    const profesor = await Maestro.findById(idProfesor);
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });

    profesor.materias = profesor.materias.filter(materia => materia.toString() !== idMateria);
    const actualizado = await profesor.save();
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Obtener materias de un profesor
exports.obtenerMateriasProfesor = async (req, res) => {
  try {
    const profesor = await Maestro.findById(req.params.id).populate('materias');
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.json(profesor.materias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Actualizar una materia de un profesor
exports.actualizarMateriaProfesor = async (req, res) => {
  try {
    const { idProfesor, idMateria, datosMateria } = req.body;
    const profesor = await Maestro.findById(idProfesor);
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });

    const materiaIndex = profesor.materias.findIndex(materia => materia.toString() === idMateria);
    if (materiaIndex === -1) return res.status(404).json({ error: 'Materia no encontrada en el profesor' });

    profesor.materias[materiaIndex] = { ...profesor.materias[materiaIndex], ...datosMateria };
    const actualizado = await profesor.save();
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};