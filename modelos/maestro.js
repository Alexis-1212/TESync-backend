const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const MaestroSchema = new Schema({
    nombre: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String },
    password: { type: String, required: true }
    // No guardamos materias aquí, para evitar datos duplicados.
});

// Encriptar contraseña
MaestroSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Maestro', MaestroSchema);