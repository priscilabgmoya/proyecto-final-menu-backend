const rolusuarios = require('../model/rolUsuario.js');

module.exports.existeRol = async function(rol){
    const rolExistente = await rolusuarios.findOne({rol: rol}); 
    if(rolExistente){
        return rolExistente; 
    }else{
        return null; 
    }
}
module.exports.buscarId = async function (id){
    const rolExistente = await rolusuarios.findById(id);
    if(rolExistente){
        return rolExistente; 
    }else{
        return null; 
    }
}
module.exports.modificaRoles = async function(id, modificacion){
    debugger
    const rolModificado = await rolusuarios.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(rolModificado){
        return rolModificado;
    }else{
        return null; 
    }
}
module.exports.validarEstado = async function (rol){
    const rolExistente = await rolusuarios.findOne({rol: rol});
    if(!rolExistente)  throw new Error(`El rol ${rol} no existe en la base de datos`);
}