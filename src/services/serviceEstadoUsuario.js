const estadousuario = require('../model/estadoUsuario');

module.exports.existeEstado = async function(nombre){
    debugger
    const estadoExistente = await estadousuario.findOne({nombre: nombre}); 
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    debugger
    const estadoExistente = await estadousuario.findById(id);
    if(estadoExistente){
        return estadoExistente; 
    }else{
        return null; 
    }
}
module.exports.modificarRoles = async function(id, modificacion){
    debugger
    const estadoModificado = await estadousuario.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(estadoModificado){
        return estadoModificado;
    }else{
        return null; 
    }
}