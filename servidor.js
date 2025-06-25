require('dotenv').config({ path: './admin.env' });
const express = require('express');
const cors = require('cors')
const conectarBD = require('./conexion/db');
const cors = require('cors');
const app = express();

// Conexión a la base de datos
conectarBD();

// Middlewares
app.use(express.json());

app.use(cors());


app.use(cors());

// Rutas (las puedes ir creando)
app.use('/api/alumnos', require('./rutas/alumnoRuta'));
app.use('/api/materias', require('./rutas/materiaRuta'));
app.use('/api/maestros', require('./rutas/maestroRuta'));
app.use('/api/usuarios', require('./rutas/alumnoRuta'));

// Puerto
const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor ejecutándose en el puerto ${PUERTO}`);
});