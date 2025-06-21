require('dotenv').config({ path: './admin.env' });
const express = require('express');
const conectarBD = require('./conexion/db');

const app = express();

// Conexión a la base de datos
conectarBD();

// Middlewares
app.use(express.json());

// Rutas (las puedes ir creando)
app.use('/api/alumnos', require('./rutas/alumnoRuta'));
app.use('/api/maestros', require('./rutas/profesorRuta'));
app.use('/api/materias', require('./rutas/materiaRuta'));

// Puerto
const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PUERTO}`);
});
