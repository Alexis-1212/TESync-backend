const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaestroMateriaSchema = new Schema({
  maestro: { type: Schema.Types.ObjectId, ref: 'Maestro', required: true },
  materia: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
  grupo: { type: String, required: true }
});

MaestroMateriaSchema.index({ maestro: 1, materia: 1, grupo: 1 }, { unique: true }); // evitar duplicados

module.exports = mongoose.model('MaestroMateria', MaestroMateriaSchema);
