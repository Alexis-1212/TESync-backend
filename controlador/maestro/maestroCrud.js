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
    const maestros = await Maestro.find().populate('materias');
    res.json(maestros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un maestro por ID
exports.obtenerMaestro = async (req, res) => {
  try {
    const maestro = await Maestro.findById(req.params.id).populate('materias');
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });
    res.json(maestro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar maestro
exports.actualizarMaestro = async (req, res) => {
  try {
    const actualizado = await Maestro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar maestro
exports.eliminarMaestro = async (req, res) => {
  try {
    await Maestro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Maestro eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

