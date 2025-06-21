const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = new Schema({
  nombre: { type: String, required: true },
  clave: { type: String, required: true, unique: true },
  creditos: { type: Number },
  unidades: { type: Number, required: true }, // Total de unidades que tiene la materia
  maestro: { type: Schema.Types.ObjectId, ref: 'Maestro' }
});

module.exports = mongoose.model('Materia', MateriaSchema);