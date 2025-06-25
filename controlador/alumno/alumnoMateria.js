const Alumno = require('../../modelos/alumno');
const Materia = require('../../modelos/materia');
const MaestroMateria = require('../../modelos/maestroMateria');
// ✅ 1. Asignar una materia a un alumno (por matrícula)
exports.agregarMateriaAlumno = async(req, res) => {
    const { matricula, claveMateria } = req.params;

    try {
        const alumno = await Alumno.findOne({ matricula });
        const materia = await Materia.findOne({ clave: claveMateria });

        if (!alumno || !materia) {
            return res.status(404).json({ error: 'Alumno o materia no encontrado' });
        }

        if (alumno.materias.includes(materia._id)) {
            return res.status(400).json({ error: 'La materia ya está asignada al alumno' });
        }

        alumno.materias.push(materia._id);
        await alumno.save();

        res.json({ mensaje: 'Materia asignada con éxito al alumno', alumno });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ 2. Eliminar una materia de un alumno (por matrícula)
exports.eliminarMateriaAlumno = async(req, res) => {
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
exports.asignarMateriaAGrupo = async(req, res) => {
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
/*
exports.verMateriasDeAlumno = async (req, res) => {
  try {
    const { matricula } = req.params;

    const alumno = await Alumno.findOne({ matricula });
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    const calificaciones = alumno.calificaciones || [];

    const materias = await Promise.all(
      calificaciones.map(async (registro) => {
        const materia = await Materia.findById(registro.materia);
        if (!materia) return null;

        // Buscar si hay profesor asignado para esa materia y grupo
        const relacion = await MaestroMateria.findOne({
          materia: materia._id,
          grupo: alumno.grupo
        }).populate('maestro');

        return {
          nombre: materia.nombre,
          clave: materia.clave,
          profesor: relacion?.maestro?.nombre || 'No asignado',
          calificacionFinal: registro.calificacionFinal || 0
        };
      })
    );

    // Filtra resultados nulos por seguridad
    res.json({ materias: materias.filter(m => m !== null) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener materias del alumno' });
  }
};*/

exports.verMateriasDeAlumno = async (req, res) => {
  const { matricula } = req.params;

  try {
    const alumno = await Alumno.findOne({ matricula })
      .populate('calificaciones.materia');

    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const materiasConProfesor = await Promise.all(
      alumno.calificaciones.map(async (calif) => {
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
          calificacionFinal: calif.calificacionFinal || 0,
          unidadesCalificaciones: calif.unidades?.map(u => u.calificacion) || [],
          profesor: maestroMateria?.maestro?.nombre || 'No asignado'
        };
      })
    );

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



/*

// ✅ 4. Ver todas las materias de un alumno
exports.verMateriasDeAlumno = async(req, res) => {
    const { matricula } = req.params;

    try {
        const alumno = await Alumno.findOne({ matricula }).populate('materias');
        if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

        res.json({ materias: alumno.materias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

*/
// ✅ 5. Ver todos los alumnos de un grupo
exports.verAlumnosPorGrupo = async(req, res) => {
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
exports.verAlumnosPorMateria = async(req, res) => {
    const { claveMateria } = req.params;

    try {
        const materia = await Materia.findOne({ clave: claveMateria });
        if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

        const alumnos = await Alumno.find({ materias: materia._id });

        res.json({ claveMateria, alumnos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};