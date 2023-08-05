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
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    contraseña: {
        type: String, 
        required: [true, 'La contraseña es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    }, 
    rol:{
        type: String, 
        enum:["rol_user","rol_adim"]
    }
})
module.exports = model("usuarios",UsuarioSchema); 