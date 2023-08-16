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
        default : Date.now
    },
    menu:{
        type: Array,
        required:[true, 'El menu es requerido']
    },
    estado:{
        type: Schema.Types.ObjectId,
        ref:"estadopedido",
        required: [ true, 'El estado es requerido']
    }, 
    precio: {
        type: String, 
        required: [true, 'El precio es requerida']
    }
})

// PedidoSchema.methods.toJSON = function() {
//     //;
// }

//Funcion para validar 
module.exports = model("pedidos",PedidoSchema); 