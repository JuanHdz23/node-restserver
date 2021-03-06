const { Schema, model } = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    no_control: {
        type: String,
        required: true
    }
});

// UsuarioSchema.methods.toJSON = function() {
//     const { __v, password, ...usuario } = this.toObject();
//     return usuario;
// }

UsuarioSchema.plugin(mongooseHidden, { hidden: { _id: false, password: true, no_control: true } });

module.exports = model( 'Usuario', UsuarioSchema );