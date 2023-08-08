const {schema, model} = require('mongoose');

const CategoriaSchema = Schema({

    nombre:{
        type: String,
        required: [true, ""],
        unique: true,
            },
          estado: {
                type: Boolean,
                required: true,
                default: true,

            },
            usuario:{
                type: Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            }


})

module.exports = model ("categoria",CategoriaSchema)