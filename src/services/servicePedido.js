const pedido = require('../model/pedidos'); 

module.exports.buscarId = async function (id){
    const usuarioExistente = await pedido.findById(id).populate('usuario', 'nombre').populate('estado', 'nombre');
    if(usuarioExistente){
        return usuarioExistente; 
    }else{
        return null; 
    }
}
module.exports.modificaPedido = async function(id, modificacion){
    const pedidoModficado = await pedido.findByIdAndUpdate(id, modificacion, {new:true}); 
    if(pedidoModficado){
        return pedidoModficado;
    }else{
        return null; 
    }
}