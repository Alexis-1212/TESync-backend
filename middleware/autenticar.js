// middleware/autenticar.js
const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, 'CLAVE_SECRETA');
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
