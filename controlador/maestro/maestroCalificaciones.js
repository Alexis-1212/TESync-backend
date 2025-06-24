const Maestro = require('../../modelos/maestro');
const Materia = require('../../modelos/materia');
const MaestroMateria = require('../../modelos/maestroMateria');
const Alumno = require('../../modelos/alumno');

// 🔎 Obtener calificaciones de una unidad y final por materia y grupo (solo las del maestro)
exports.obtenerCalificacionesPorUnidadYGrupo = async (req, res) => {
  try {
    const { cedula, claveMateria, grupo, unidad } = req.params;

    // 1. Buscar al maestro por cédula
    const maestro = await Maestro.findOne({ cedula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });

    // 2. Buscar la materia por clave
    const materia = await Materia.findOne({ clave: claveMateria });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    // 3. Verificar si el maestro tiene asignada esta materia y grupo
    const relacion = await MaestroMateria.findOne({
      maestro: maestro._id,
      materia: materia._id,
      grupo
    });

    if (!relacion) return res.status(403).json({ error: 'El maestro no tiene asignada esta materia o grupo' });

    // 4. Buscar alumnos del grupo que tengan esa materia
    const alumnos = await Alumno.find({
      grupo,
      'calificaciones.materia': materia._id
    }).populate('calificaciones.materia', 'nombre clave');

    // 5. Extraer las calificaciones de la unidad y la final
    const resultados = alumnos.map(alumno => {
      const calificacion = alumno.calificaciones.find(
        c => c.materia._id.toString() === materia._id.toString()
      );

      if (!calificacion) return null;

      const unidadInfo = calificacion.unidades.find(u => u.numero === parseInt(unidad));

      return {
        alumno: alumno.nombre,
        matricula: alumno.matricula,
        grupo: alumno.grupo,
        unidad: unidadInfo ? unidadInfo.calificacion : null,
        final: calificacion.final
      };
    }).filter(r => r !== null);

    res.json({ materia: materia.nombre, grupo, unidad: `Unidad ${unidad}`, resultados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener calificaciones' });
  }
};
