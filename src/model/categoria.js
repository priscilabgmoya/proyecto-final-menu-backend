const {schema, model} = require('mongoose');

const CategoriaSchema = Schema({

    nombre:{
        type: String,
        required: [true, "Nombre de la categoria"],
        
            },
          estado: {
                type: Boolean,
                required: true,
               

            }


});
CategoriaSchema.methods.toJSON = function(){
    const {__v, _id, ...CategoriaSchema} = this.toObject();
    return CategoriaSchema;
}



module.exports = model ("categoria",CategoriaSchema)