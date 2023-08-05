const {Schema, model} =require('mongoose');

const EstadoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del estado es requerido']
    },
    estado:{
        type: Boolean,
        required: [true, 'El valor del estado  es requerido']
    }
});
EstadoSchema.methods.toJSON = function() {
    const {__v, _id, ...estadoUsuario} = this.toObject();
    return estadoUsuario;
}
module.exports= model('estadousuario', EstadoSchema);