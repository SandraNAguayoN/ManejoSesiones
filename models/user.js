const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({ //Esquema de la colección Usuario para la bd en mongodb
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;