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
    const {__v, ...estadoPedido} = this.toObject();
    return estadoPedido;
}
module.exports= model('estadopedido', EstadoSchema);