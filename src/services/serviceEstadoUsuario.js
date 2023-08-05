const estadousuario = require('../model/estadoUsuario');

module.exports.existeEstado = async function(nombre){
    const estadoExistente = await estadousuario.findOne({nombre: nombre}); 
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const estadoExistente = await estadousuario.findById(id);
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarRoles = async function(id, modificacion){
    const estadoModificado = await estadousuario.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(estadoModificado){
        return estadoModificado;
    }else{
        return null; 
    }
}
module.exports.validarEstado = async function (nombre){
    const estadoExistente = await estadousuario.findOne({nombre: nombre});
    if(!estadoExistente)  throw new Error(`El estado ${nombre} no existe en la base de datos`);
}