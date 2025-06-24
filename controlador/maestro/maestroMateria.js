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

// Crear relación maestro-materia-grupo usando cédula y clave
exports.crearRelacion = async (req, res) => {
  try {
    const { cedula, clave, grupo } = req.body;

    const maestro = await Maestro.findOne({ cedula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });

    const materia = await Materia.findOne({ clave });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    const duplicado = await MaestroMateria.findOne({
      maestro: maestro._id,
      materia: materia._id,
      grupo
    });
    if (duplicado)
      return res.status(400).json({ error: 'Ya existe esa asignación' });

    const nuevaRelacion = new MaestroMateria({
      maestro: maestro._id,
      materia: materia._id,
      grupo
    });
    await nuevaRelacion.save();

    res.status(201).json({ mensaje: 'Relación creada correctamente', relacion: nuevaRelacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar relación maestro-materia-grupo usando cédula y clave
exports.eliminarRelacion = async (req, res) => {
  try {
    const { cedula, clave, grupo } = req.body;

    const maestro = await Maestro.findOne({ cedula });
    const materia = await Materia.findOne({ clave });
    if (!maestro || !materia)
      return res.status(404).json({ error: 'Maestro o materia no encontrado' });

    const eliminada = await MaestroMateria.findOneAndDelete({
      maestro: maestro._id,
      materia: materia._id,
      grupo
    });
    if (!eliminada)
      return res.status(404).json({ error: 'No se encontró esa asignación' });

    res.json({ mensaje: 'Relación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar relación maestro-materia-grupo usando cédula y claves
exports.editarRelacion = async (req, res) => {
  try {
    const { cedula, claveAnterior, grupoAnterior, grupoNuevo, claveNueva } = req.body;

    const maestro = await Maestro.findOne({ cedula });
    if (!maestro) return res.status(404).json({ error: 'Maestro no encontrado' });

    const materiaAnterior = await Materia.findOne({ clave: claveAnterior });
    if (!materiaAnterior) return res.status(404).json({ error: 'Materia anterior no encontrada' });

    let materiaNueva = null;
    if (claveNueva) {
      materiaNueva = await Materia.findOne({ clave: claveNueva });
      if (!materiaNueva) return res.status(404).json({ error: 'Materia nueva no encontrada' });
    }

    const filtro = {
      maestro: maestro._id,
      materia: materiaAnterior._id,
      grupo: grupoAnterior
    };

    const actualizacion = {};
    if (grupoNuevo) actualizacion.grupo = grupoNuevo;
    if (materiaNueva) actualizacion.materia = materiaNueva._id;

    const actualizado = await MaestroMateria.findOneAndUpdate(filtro, actualizacion, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Relación no encontrada para actualizar' });

    res.json({ mensaje: 'Relación actualizada', actualizada: actualizado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verRelaciones = async (req, res) => {
  try {
    const relaciones = await MaestroMateria.find()
      .populate('maestro', 'nombre cedula')
      .populate('materia', 'nombre clave');

    const resultado = relaciones.map(rel => ({
      maestro: rel.maestro.nombre,
      cedula: rel.maestro.cedula,
      materia: rel.materia.nombre,
      clave: rel.materia.clave,
      grupo: rel.grupo
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las relaciones' });
  }
};


