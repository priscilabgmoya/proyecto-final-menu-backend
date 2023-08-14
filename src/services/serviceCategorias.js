const Categoria = require('../model/categoria');

module.exports.existeCategoria = async function(nombre){
    const categoriaExistente = await Categoria.findOne({nombre: nombre}); 
    if(categoriaExistente){
        return categoriaExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const categoriaExistente = await Categoria.findById(id);
    if(categoriaExistente){
        return categoriaExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarCategoria = async function(id, modificacion){
    const categoriaModificado = await Categoria.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(categoriaModificado){
        return categoriaModificado;
    }else{
        return null; 
    }
}
module.exports.validarCategoria = async function (nombre){
    const categoriaExistente = await Categoria.findOne({nombre: nombre});
    if(!categoriaExistente)  throw new Error(`El estado ${nombre} no existe en la base de datos`);
}