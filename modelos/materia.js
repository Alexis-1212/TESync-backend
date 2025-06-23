const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = new Schema({
  nombre: { type: String, required: true },
  clave: { type: String, required: true, unique: true },
  creditos: { type: Number },
  unidades: { type: Number, required: true }
});

module.exports = mongoose.model('Materia', MateriaSchema);