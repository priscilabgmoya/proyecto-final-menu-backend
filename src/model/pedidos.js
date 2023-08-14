const {Schema, model} =require('mongoose');

const PedidoSchema = Schema ({

    //usuario
    //fecha
    //menu
    //estado

    usuario: {
        type: Schema.Types.ObjectId,
        ref:"usuarios",
        required : [true , 'El usuario es requerido']
    },
    fecha:{
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    menu:{
        type: Array,
        required:[true, 'El menu es requerido']
    },
    estado:{
        type: Schema.Types.ObjectId,
        ref:"estadopedido",
        required: [ true, 'El estado es requerido']
    }
})

// PedidoSchema.methods.toJSON = function() {
//     //;
// }

//Funcion para validar 
module.exports = model("pedidos",PedidoSchema); 