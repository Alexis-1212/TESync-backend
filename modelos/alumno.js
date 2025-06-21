const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  correo: { type: String },
  grupo: { type: String },
  calificaciones: [
    {
      materia: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
      unidades: [
        {
          numero: { type: Number }, // Número de unidad (1, 2, 3, ...)
          calificacion: { type: Number, min: 0, max: 100 }
        }
      ],
      final: { type: Number, min: 0, max: 100 }, // Calificación final
      fecha: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Alumno', AlumnoSchema)