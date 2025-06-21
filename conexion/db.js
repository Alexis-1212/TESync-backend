const mongoose = require('mongoose');
require('dotenv').config({ path: './admin.env' });

const cadenaConexion = process.env.CADENA_CONEXION_DB;

const conectarBD = async () => {
  try {
    await mongoose.connect(cadenaConexion);
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = conectarBD;
