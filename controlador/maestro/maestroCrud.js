const Maestro = require('../../modelos/maestro');

// Crear maestro
exports.crearMaestro = async (req, res) => {
  try {
    const nuevo = new Maestro(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los maestros
exports.obtenerMaestros = async (req, res) => {
  try {
    const maestros = await Maestro.find(); // Quitar populate si no usas materias
    res.json(maestros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un maestro por matrícula
exports.obtenerMaestro = async (req, res) => {
  try {
    const { matricula } = req.params;
    const maestro = await Maestro.findOne({ matricula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });
    res.json(maestro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar maestro por matrícula
exports.actualizarMaestro = async (req, res) => {
  try {
    const { matricula } = req.params;
    const actualizado = await Maestro.findOneAndUpdate({ matricula }, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Maestro no encontrado para actualizar' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar maestro por matrícula
exports.eliminarMaestro = async (req, res) => {
  try {
    const { matricula } = req.params;
    const eliminado = await Maestro.findOneAndDelete({ matricula });
    if (!eliminado) return res.status(404).json({ error: 'Maestro no encontrado para eliminar' });
    res.json({ mensaje: 'Maestro eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


