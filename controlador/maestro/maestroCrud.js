const Maestro = require('../../modelos/maestro');

// Crear maestro
exports.crearMaestro = async(req, res) => {
    try {
        const nuevo = new Maestro(req.body);
        const guardado = await nuevo.save();
        res.status(201).json(guardado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los maestros
exports.obtenerMaestros = async(req, res) => {
    try {
        const maestros = await Maestro.find();
        res.json(maestros);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener maestro por CÉDULA
exports.obtenerMaestro = async(req, res) => {
    try {
        const { cedula } = req.params;
        const maestro = await Maestro.findOne({ cedula });
        if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });
        res.json(maestro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar maestro por CÉDULA
exports.actualizarMaestro = async(req, res) => {
    try {
        const { cedula } = req.params;
        const actualizado = await Maestro.findOneAndUpdate({ cedula }, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ error: 'Maestro no encontrado para actualizar' });
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar maestro por CÉDULA
exports.eliminarMaestro = async(req, res) => {
    try {
        const { cedula } = req.params;
        const eliminado = await Maestro.findOneAndDelete({ cedula });
        if (!eliminado) return res.status(404).json({ error: 'Maestro no encontrado para eliminar' });
        res.json({ mensaje: 'Maestro eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};