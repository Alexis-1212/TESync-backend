const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  correo: { type: String },
  grupo: { type: String },
  contraseña: { type: String, required: true },
  calificaciones: [
    {
      materia: { type: Schema.Types.ObjectId, ref: 'Materia' },
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

// 🔐 Encriptar contraseña antes de guardar
AlumnoSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
