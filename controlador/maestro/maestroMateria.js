const MaestroMateria = require('../../modelos/maestroMateria');
const Maestro = require('../../modelos/maestro');
const Materia = require('../../modelos/materia');
const Alumno = require('../../modelos/alumno');

// Ver materias y grupos que tiene un maestro, con alumnos por materia y grupo
exports.verMateriasDeMaestro = async (req, res) => {
  try {
    const { cedula } = req.params;
    const maestro = await Maestro.findOne({ cedula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });

    const relaciones = await MaestroMateria.find({ maestro: maestro._id }).populate('materia');
    const gruposSet = new Set();
    const detallesMaterias = [];

    for (const relacion of relaciones) {
      const alumnos = await Alumno.find({ 'calificaciones.materia': relacion.materia._id });
      alumnos.forEach(a => gruposSet.add(a.grupo));

      detallesMaterias.push({
        clave: relacion.materia.clave,
        nombre: relacion.materia.nombre,
        creditos: relacion.materia.creditos,
        unidades: relacion.materia.unidades,
        totalAlumnos: alumnos.length,
        alumnos: alumnos.map(a => ({
          nombre: a.nombre,
          matricula: a.matricula,
          grupo: a.grupo
        }))
      });
    }

    res.json({
      maestro: maestro.nombre,
      materias: relaciones.map(r => r.materia),
      grupos: Array.from(gruposSet),
      detallesMaterias
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};

// Asignar materia a maestro
exports.asignarMateria = async (req, res) => {
  try {
    const { cedula, clave } = req.params;
    const maestro = await Maestro.findOne({ cedula });
    const materia = await Materia.findOne({ clave });
    if (!maestro || !materia) return res.status(404).json({ error: 'Maestro o materia no encontrada' });

    const yaExiste = await MaestroMateria.findOne({ maestro: maestro._id, materia: materia._id });
    if (yaExiste) return res.status(400).json({ error: 'Materia ya asignada a este maestro' });

    const nuevaRelacion = new MaestroMateria({ maestro: maestro._id, materia: materia._id });
    await nuevaRelacion.save();

    res.json({ mensaje: 'Materia asignada correctamente', relacion: nuevaRelacion });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar materia' });
  }
};

// Eliminar materia asignada a maestro
exports.eliminarMateria = async (req, res) => {
  try {
    const { cedula, clave } = req.params;
    const maestro = await Maestro.findOne({ cedula });
    const materia = await Materia.findOne({ clave });
    if (!maestro || !materia) return res.status(404).json({ error: 'Maestro o materia no encontrada' });

    const eliminada = await MaestroMateria.findOneAndDelete({ maestro: maestro._id, materia: materia._id });
    if (!eliminada) return res.status(404).json({ error: 'No se encontró la asignación para eliminar' });

    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar materia' });
  }
};

// Editar materia asignada
exports.editarMateriaAsignada = async (req, res) => {
  try {
    const { cedula, claveAnterior } = req.params;
    const { claveNueva } = req.body;

    const maestro = await Maestro.findOne({ cedula });
    const materiaAnterior = await Materia.findOne({ clave: claveAnterior });
    const materiaNueva = await Materia.findOne({ clave: claveNueva });

    if (!maestro || !materiaAnterior || !materiaNueva)
      return res.status(404).json({ error: 'Datos inválidos' });

    const actualizada = await MaestroMateria.findOneAndUpdate(
      { maestro: maestro._id, materia: materiaAnterior._id },
      { materia: materiaNueva._id },
      { new: true }
    );

    if (!actualizada) return res.status(404).json({ error: 'No se encontró la relación para actualizar' });

    res.json({ mensaje: 'Materia actualizada correctamente', actualizada });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar materia' });
  }
};
