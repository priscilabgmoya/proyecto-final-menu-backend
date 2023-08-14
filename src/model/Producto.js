
//importamos esto para permitirme crear el modelo y mandar el esquema a la db
const { Schema, model } = require('mongoose')

//aqui definimos los campos que vamos a tener en la base de datos
const ProductoSchema = Schema({
    /**
     * codigo nombre urlImagen detalle precio categoria publicado combo descuento porcentaje
     */

    nombre: {
        type: String,
        required: [true, "No se ha ingresado el nombre del menú"]
    },
    urlImagen: {
        type: String,
        required: [true, "No se ha ingresado la imagen del menú"]
    },
    detalle: {
        type: String,
        required: [true, "no se ha ingresado ninguna descripción del menú"]
    },
    precio: {
        type: Number,
        required: [true, "no se ha ingresado el precio"]
    },
    categoria: {
        type: String,
        required: [true, "no se ha ingresado la categoría"],
        enum: ["PIZZA", "SANDWICH", "EMPANADA", "AL PLATO", "BEBIDAS"]
    },
    publicado: {
        type: Boolean,
        default: true
    },
    descuento: {
        type: Boolean,
        default: false
    },
    porcentaje: {
        type: Number,
        required: [true, "no se ha ingresado un porcentaje al menú"]
    }
})


//para esto exportamos Model arriba, recibe 2 datos
/**
 * 1. el nombre con el que vamos a hacer referencia a este modelo
 * 2. el esquema que quiero exportar (el que hice arriba, siempre 1 esquema x archivo)
 */
module.exports = model("Menu", ProductoSchema)