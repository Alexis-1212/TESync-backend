const Materia = require('../../modelos/materia');

// Crear una nueva materia
// POST /api/materias
exports.crearMateria = async (req, res) => {
  try {
    // Crea una nueva instancia de Materia con los datos recibidos en el body
    const nuevaMateria = new Materia(req.body);

    // Guarda la nueva materia en la base de datos
    const guardada = await nuevaMateria.save();

    // Responde con el objeto creado y estado HTTP 201 (creado)
    res.status(201).json(guardada);
  } catch (err) {
    // Si hay error, responde con status 400 y mensaje del error
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las materias
// GET /api/materias
exports.obtenerMaterias = async (req, res) => {
  try {
    // Busca todas las materias en la base de datos
    const materias = await Materia.find();

    // Responde con la lista de materias
    res.json(materias);
  } catch (err) {
    // Error en el servidor
    res.status(500).json({ error: err.message });
  }
};

// Obtener una materia por su ID
// GET /api/materias/:id
exports.obtenerMateria = async (req, res) => {
  try {
    // Busca una materia por su id recibido en la ruta
    const materia = await Materia.findById(req.params.id);

    // Si no existe, responder error 404
    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Si existe, responder con la materia
    res.json(materia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una materia por su ID
// PUT /api/materias/:id
exports.actualizarMateria = async (req, res) => {
  try {
    // Busca y actualiza la materia con los datos del body, devuelve el nuevo objeto actualizado
    const actualizado = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Si no se encontró la materia, error 404
    if (!actualizado) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Si se actualizó, responder con la materia actualizada
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una materia por su ID
// DELETE /api/materias/:id
exports.eliminarMateria = async (req, res) => {
  try {
    // Busca y elimina la materia por id
    const eliminado = await Materia.findByIdAndDelete(req.params.id);

    // Si no se encontró, error 404
    if (!eliminado) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Si se eliminó, responde mensaje de éxito
    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
