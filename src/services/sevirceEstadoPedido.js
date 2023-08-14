const estadopedido = require('../model/estadosPedidos');

module.exports.existeEstado = async function(nombre){
    const estadoExistente = await estadopedido.findOne({nombre: nombre}); 
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const estadoExistente = await estadopedido.findById(id);
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarEstado = async function(id, modificacion){
    const estadoModificado = await estadopedido.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(estadoModificado){
        return estadoModificado;
    }else{
        return null; 
    }
}
module.exports.validarEstado = async function (nombre){
    const estadoExistente = await estadopedido.findOne({nombre: nombre});
    if(!estadoExistente)  throw new Error(`El estado ${nombre} no existe en la base de datos`);
}