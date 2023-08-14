const { request, response } = require('express');

const Pedido = require('../model/pedidos')

// Guardar Pedido
const guardarPedido = async (req = request , res = response) => {
    try {
        const usuario = req.usuario._id
        const {fecha, menu, estado,precio} = req.body

       const nuevoPedido = new Pedido({
           usuario,
            fecha,
            menu,
            estado,
            precio
        });

        await nuevoPedido.save()
        .then(data => {
            if(data !== null){
                return res.status(201).json({mensaje: 'Pedido Creado', data: data})
            }else{
                return  res.status(500).json({msg: "Falló al agregar el nuevo pedido !!!"});
            }
});
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
};


//Mostrar pedido

const mostrarPedidos = async (req = request , res = response) => {
    try {
        const pedidos = await Pedido.find().populate('usuario', ' nombre ').populate('estado', 'nombre');
        if(pedidos.length  == 0 ) return res.status(404).json({msg: "Pedidos no disponibles "});
        
        return res.status(200).json({msg: "lista de usuarios", data: pedidos});
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
};

//Modificar estado Pedido

const modificarEstadoPedido = async (req = request , res = response) => {
    try {
   const {id, ...pedidoModificado} = req.body;

    const pedido_encontrado = await buscarId(id); 
    if(!pedido_encontrado)  return res.status(404).json({msg: "Pedido no encontrado"});
  
    const isUpdateOk = await modificarRoles(id,pedidoModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Pedido Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar el pedido !!!"});
    }
  
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
};

// Eliminiar pedido
const eliminarPedido = async (req = request , res = response) => {
    try {
        const {id, ...pedidoModificado} = req.body;

        const pedido_encontrado = await buscarId(id); 
        if(!pedido_encontrado)  return res.status(404).json({msg: "Pedido no encontrado"});
      
        const isDeleteOk = await modificarRoles(id,pedidoModificado); 
        if(isDeleteOk){
         return  res.status(200).json({msg: "Pedido Eliminado",data: isDeleteOk})
        }else {
          return  res.status(500).json({msg: "Falló al eliminar el pedido !!!"});
        }
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
};
async function obtenerPedido(req= request, res = response){
    try {
       const {id} = req.params.id; 
  
       const categoriaExistente = await buscarId(id);
       if (!categoriaExistente) res.status(404).json({msg: "pedido no encontrado!!"});
  
        return res.status(200).json({msg: "pedido", data: categoriaExistente});
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
  }
module.exports = {
    guardarPedido,
    modificarEstadoPedido,
    mostrarPedidos,
    eliminarPedido,
    obtenerPedido
}