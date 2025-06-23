const bcrypt = require('bcryptjs');
const Maestro = require('../../modelos/maestro');

exports.autenticarMaestro = async (req, res) => {
  console.log('req.body:', req.body); //
  const { cedula, password } = req.body;

  try {
    const maestro = await Maestro.findOne({ cedula });
    if (!maestro) {
      return res.status(401).json({ error: 'Cédula o contraseña incorrecta' });
    }

    const coincide = await bcrypt.compare(password, maestro.password);
    if (!coincide) {
      return res.status(401).json({ error: 'Cédula o contraseña incorrecta' });
    }

    res.json({ mensaje: 'Inicio de sesión exitoso', maestro });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
