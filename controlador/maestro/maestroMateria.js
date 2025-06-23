const MaestroMateria = require('../../modelos/maestroMateria');
const Maestro = require('../../modelos/maestro');
const Materia = require('../../modelos/materia');

exports.verMateriasDeMaestro = async (req, res) => {
  try {
    const { matricula } = req.params;

    // Buscar el maestro
    const maestro = await Maestro.findOne({ matricula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });

    // Buscar las materias relacionadas
    const relaciones = await MaestroMateria.find({ maestro: maestro._id })
      .populate('materia', 'nombre clave creditos unidades');

    const materias = relaciones.map(rel => rel.materia);

    res.json({ maestro: maestro.nombre, materias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};
