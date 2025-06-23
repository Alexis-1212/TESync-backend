const bcrypt = require('bcryptjs');
const Alumno = require('../../modelos/alumno');

exports.autenticarAlumno = async (req, res) => {
  const { matricula, contraseña } = req.body;

  try {
    const alumno = await Alumno.findOne({ matricula });
    if (!alumno) return res.status(401).json({ error: 'Matrícula o contraseña incorrecta' });

    const coincide = await bcrypt.compare(contraseña, alumno.contraseña);
    if (!coincide) return res.status(401).json({ error: 'Matrícula o contraseña incorrecta' });

    res.json({ mensaje: 'Inicio de sesión exitoso', alumno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
