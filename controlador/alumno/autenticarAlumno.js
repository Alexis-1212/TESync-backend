const Alumno = require('../../modelos/alumno');

// POST /api/alumnos/login
exports.autenticarAlumno = async (req, res) => {
  const { matricula, contraseña } = req.body;

  try {
    const alumno = await Alumno.findOne({ matricula });

    if (!alumno || alumno.contraseña !== contraseña) {
      return res.status(401).json({ error: 'Matrícula o contraseña incorrecta' });
    }

    // Solo devuelve los datos del alumno si la autenticación es correcta
    res.json({ mensaje: 'Inicio de sesión exitoso', alumno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
