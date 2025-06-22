const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  correo: { type: String },
  grupo: { type: String },
  contraseña: { type: String, required: true },
  calificaciones: [
    {
      materia: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
      unidades: [
        {
          numero: { type: Number },
          calificacion: { type: Number, min: 0, max: 100 }
        }
      ],
      final: { type: Number, min: 0, max: 100 },
      fecha: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Alumno', AlumnoSchema);