const usuarios = require('../model/usuarios'); 

module.exports.buscarId = async function (id){
    const usuarioExistente = await usuarios.findById(id);
    if(usuarioExistente){
        return usuarioExistente; 
    }else{
        return null; 
    }
}
module.exports.modificaUsuario = async function(id, modificacion){
    debugger
    const usuarioModficado = await usuarios.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(usuarioModficado){
        return usuarioModficado;
    }else{
        return null; 
    }
}