const Alumno = require('../../modelos/alumno');
const Materia = require('../../modelos/materia');
const MaestroMateria = require('../../modelos/maestroMateria');
// ✅ 1. Asignar una materia a un alumno (por matrícula)
exports.agregarMateriaAlumno = async (req, res) => {
  const { matricula, claveMateria } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula });
    const materia = await Materia.findOne({ clave: claveMateria });

    if (!alumno || !materia) {
      return res.status(404).json({ error: 'Alumno o materia no encontrado' });
    }

    // Asegurar que calificaciones esté definido
    if (!alumno.calificaciones) alumno.calificaciones = [];

    const yaTiene = alumno.calificaciones.some(
      c => c.materia.toString() === materia._id.toString()
    );

    if (yaTiene) {
      return res.status(400).json({ error: 'La materia ya está asignada al alumno' });
    }

    alumno.calificaciones.push({
      materia: materia._id,
      unidades: [],
      final: 0,
    });

    await alumno.save();

    res.json({ mensaje: 'Materia asignada con éxito al alumno', alumno });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ 2. Eliminar una materia de un alumno (por matrícula)
exports.eliminarMateriaAlumno = async (req, res) => {
  const { matricula, claveMateria } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula });
    const materia = await Materia.findOne({ clave: claveMateria });

    if (!alumno || !materia) {
      return res.status(404).json({ error: 'Alumno o materia no encontrado' });
    }

    alumno.materias = alumno.materias.filter(id => id.toString() !== materia._id.toString());
    await alumno.save();

    res.json({ mensaje: 'Materia eliminada del alumno', alumno });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ 3. Asignar una materia a todos los alumnos de un grupo
exports.asignarMateriaAGrupo = async (req, res) => {
  const { grupo, claveMateria } = req.params;

  try {
    const materia = await Materia.findOne({ clave: claveMateria });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    const alumnos = await Alumno.find({ grupo });
    if (alumnos.length === 0) {
      return res.status(404).json({ error: 'No hay alumnos en este grupo' });
    }

    const actualizados = [];

    for (const alumno of alumnos) {
      if (!alumno.materias.includes(materia._id)) {
        alumno.materias.push(materia._id);
        await alumno.save();
        actualizados.push(alumno.matricula);
      }
    }

    res.json({ mensaje: 'Materia asignada al grupo', alumnosActualizados: actualizados });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ 4. Ver todas las materias de un alumno
exports.verMateriasDeAlumno = async (req, res) => {
  const { matricula } = req.params;

  try {
    // Traemos alumno con materias pobladas
    const alumno = await Alumno.findOne({ matricula })
      .populate('calificaciones.materia');

    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    // Para cada materia, obtener el maestro que la imparte para el grupo del alumno
    const materiasConProfesor = await Promise.all(
      alumno.calificaciones.map(async (calif) => {
        // Buscar MaestroMateria que relacione la materia y grupo
        const maestroMateria = await MaestroMateria.findOne({
          materia: calif.materia._id,
          grupo: alumno.grupo
        }).populate('maestro');

        return {
          nombre: calif.materia.nombre,
          clave: calif.materia.clave,
          creditos: calif.materia.creditos,
          unidades: calif.materia.unidades,
          grupo: alumno.grupo,
          calificacionFinal: calif.final,
          unidadesCalificaciones: calif.unidades.map(u => u.calificacion),
          profesor: maestroMateria ? maestroMateria.maestro.nombre : 'No asignado'
        };
      })
    );

    // Responder con los datos armados
    res.json({
      nombre: alumno.nombre,
      matricula: alumno.matricula,
      grupo: alumno.grupo,
      materias: materiasConProfesor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};




// ✅ 5. Ver todos los alumnos de un grupo
exports.verAlumnosPorGrupo = async (req, res) => {
  const { grupo } = req.params;

  try {
    const alumnos = await Alumno.find({ grupo });
    if (alumnos.length === 0) {
      return res.status(404).json({ error: 'No hay alumnos en este grupo' });
    }

    res.json({ grupo, alumnos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ 6. Ver todos los alumnos inscritos en una materia
exports.verAlumnosPorMateria = async (req, res) => {
  const { claveMateria } = req.params;

  try {
    const materia = await Materia.findOne({ clave: claveMateria });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    // Buscar alumnos que tengan la materia en su arreglo calificaciones
    const alumnos = await Alumno.find({ 'calificaciones.materia': materia._id });

    res.json({ claveMateria, alumnos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
