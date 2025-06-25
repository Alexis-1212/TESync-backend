// 📁 controlador/alumno/alumnoCalificaciones.js
const Alumno = require('../../modelos/alumno');
const Materia = require('../../modelos/materia');

// ✅ Agregar calificaciones de una materia para un alumno
exports.agregarCalificacionMateria = async (req, res) => {
  const { matricula, clave } = req.params;
  const { unidades, final } = req.body;

  try {
    const alumno = await Alumno.findOne({ matricula });
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    const materia = await Materia.findOne({ clave });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada por clave' });

    const materiaId = materia._id;

    // Verificar si ya existe calificación para esa materia
    const yaExiste = alumno.calificaciones.some(calif => calif.materia.equals(materiaId));
    if (yaExiste) return res.status(400).json({ error: 'Ya existe calificación para esta materia' });

    if (!Array.isArray(unidades) || unidades.length !== materia.unidades) {
      return res.status(400).json({
        error: `Esta materia requiere ${materia.unidades} unidades, pero se enviaron ${unidades.length}.`
      });
    }

    const califInvalida = unidades.some(
      u => typeof u.numero !== 'number' || typeof u.calificacion !== 'number'
    );
    if (califInvalida) {
      return res.status(400).json({ error: 'Formato inválido de unidades.' });
    }

    alumno.calificaciones.push({ materia: materiaId, unidades, final });
    await alumno.save();

    res.status(201).json({ mensaje: 'Calificación agregada', alumno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editarCalificacionMateria = async (req, res) => {
  const { matricula, clave } = req.params;
  const { unidades, final } = req.body;

  try {
    const alumno = await Alumno.findOne({ matricula });
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    const materia = await Materia.findOne({ clave });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada por clave' });

    const materiaId = materia._id;

    const calificacion = alumno.calificaciones.find(calif => calif.materia.equals(materiaId));
    if (!calificacion) return res.status(404).json({ error: 'Calificación no encontrada para esa materia' });

    if (unidades) calificacion.unidades = unidades;
    if (final !== undefined) calificacion.final = final;

    await alumno.save();
    res.json({ mensaje: 'Calificación actualizada', alumno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Eliminar calificación de una materia
exports.eliminarCalificacionMateria = async (req, res) => {
  const { matricula, materiaId } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula });
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    alumno.calificaciones = alumno.calificaciones.filter(
      calif => !calif.materia.equals(materiaId)
    );

    await alumno.save();
    res.json({ mensaje: 'Calificación eliminada', alumno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Consultar calificaciones de un alumno
exports.obtenerCalificacionesAlumno = async (req, res) => {
  const { matricula } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula }).populate('calificaciones.materia');
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    res.json(alumno.calificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Consultar calificación de un alumno para una materia específica
exports.obtenerCalificacionMateriaEspecifica = async (req, res) => {
  const { matricula, materiaId } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula }).populate('calificaciones.materia');
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    const calificacion = alumno.calificaciones.find(calif => calif.materia._id.equals(materiaId));
    if (!calificacion) return res.status(404).json({ error: 'No hay calificación registrada para esa materia' });

    res.json(calificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
