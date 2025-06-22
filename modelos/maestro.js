const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaestroSchema = new Schema({
  nombre: { type: String, required: true },
  cedula: { type: String },
  correo: { type: String },
  materias: [{ type: Schema.Types.ObjectId, ref: 'Materia' }] // Materias que imparte
});

module.exports = mongoose.model('Maestro', MaestroSchema);