const Maestro = require('../../modelos/maestro');
const bcrypt = require('bcryptjs');

// Registrar maestro con nombre y contraseña
exports.registrarMaestro = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    // Verificar si ya existe un maestro con ese nombre
    const maestroExistente = await Maestro.findOne({ nombre });
    if (maestroExistente) {
      return res.status(400).json({ mensaje: 'El nombre ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoMaestro = new Maestro({ nombre, password: passwordHash });
    await nuevoMaestro.save();

    res.status(201).json({ mensaje: 'Maestro registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar maestro', error });
  }
};

// Iniciar sesión con nombre y contraseña
exports.loginMaestro = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    const maestro = await Maestro.findOne({ nombre });
    if (!maestro) {
      return res.status(404).json({ mensaje: 'Nombre no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, maestro.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      maestro: {
        id: maestro._id,
        nombre: maestro.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};
