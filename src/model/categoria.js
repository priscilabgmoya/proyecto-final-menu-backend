const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, "Nombre de la categoria"],
    },
    estado: {
        type: Boolean,
        required: [true, "Nombre de la categoria"],
    }


});
CategoriaSchema.methods.toJSON = function () {
    const { __v, ...CategoriaSchema } = this.toObject();
    return CategoriaSchema;
}



module.exports = model("categoria", CategoriaSchema)