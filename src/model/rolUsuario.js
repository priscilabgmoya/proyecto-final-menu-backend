const {Schema, model} = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

RolSchema.methods.toJSON = function() {
    const {__v, ...rolUsuario} = this.toObject();
    return rolUsuario;
}
module.exports= model('rolusuarios', RolSchema);