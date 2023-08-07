const {Schema, model} =require('mongoose');

const UsuarioSchema = Schema ({
    // nombre 
    // correo 
    // contraseña 
    //estado
    //rol
    nombre: {
        type: String, 
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    contraseña: {
        type: String, 
        required: [true, 'La contraseña es requerido']
    },
    estado: {
        type: String,
        required: [true, 'El estado es requerido']
    }, 
    rol:{
        type: String,
        required: [true, 'El rol  es requerido']
    }
})

UsuarioSchema.methods.toJSON = function() {
    const {__v, contraseña, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = model("usuarios",UsuarioSchema); 