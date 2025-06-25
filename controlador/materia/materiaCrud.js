const Materia = require('../../modelos/materia');

// Crear una nueva materia
exports.crearMateria = async(req, res) => {
    try {
        const nuevaMateria = new Materia(req.body);
        const guardada = await nuevaMateria.save();
        res.status(201).json(guardada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todas las materias
exports.obtenerMaterias = async(req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una materia por su CLAVE
exports.obtenerMateria = async(req, res) => {
    try {
        const materia = await Materia.findOne({ clave: req.params.clave });
        if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
        res.json(materia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una materia por su CLAVE
exports.actualizarMateria = async(req, res) => {
    try {
        const actualizado = await Materia.findOneAndUpdate({ clave: req.params.clave },
            req.body, { new: true }
        );
        if (!actualizado) return res.status(404).json({ error: 'Materia no encontrada' });
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar una materia por su CLAVE
exports.eliminarMateria = async(req, res) => {
    try {
        const eliminado = await Materia.findOneAndDelete({ clave: req.params.clave });
        if (!eliminado) return res.status(404).json({ error: 'Materia no encontrada' });
        res.json({ mensaje: 'Materia eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.actualizarEstadoMateria = async(req, res) => {
    const { clave } = req.params;
    const { estado } = req.body;

    try {
        const materia = await Materia.findOneAndUpdate({ clave }, { estado }, { new: true } // devuelve la materia actualizada
        );

        if (!materia) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }

        res.json({ mensaje: 'Estado actualizado correctamente', materia });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener solo los nombres de las materias
exports.obtenerNombresMaterias = async(req, res) => {
    try {
        const materias = await Materia.find({}, 'nombre'); // Solo devuelve el campo 'nombre'
        res.json(materias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};