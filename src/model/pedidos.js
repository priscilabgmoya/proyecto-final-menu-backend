const {Schema, model} =require('mongoose');

const PedidoSchema = Schema ({

    //usuario
    //fecha
    //menu
    //estado

    usuario: {
        type: Object,
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
        type: String,
        required: [ true, 'El estado es requerido']
    }
})

// PedidoSchema.methods.toJSON = function() {
//     //;
// }

//Funcion para validar usuario
module.exports = model("pedidos",PedidoSchema); 