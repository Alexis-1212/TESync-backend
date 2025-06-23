const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaestroSchema = new Schema({
  nombre: { type: String, required: true },
  cedula: { type: String },
  correo: { type: String },
  password: { type: String, required: true },
  materias: [{ type: Schema.Types.ObjectId, ref: 'Materia' }]
});

module.exports = mongoose.model('Maestro', MaestroSchema);
