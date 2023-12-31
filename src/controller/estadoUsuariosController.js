const {request, response} = require('express'); 
const estadousuario = require('../model/estadoUsuario');
const {existeEstado,buscarId,modificarRoles} = require('../services/serviceEstadoUsuario')

async function obtenerEstadosUsuarios( req= request, res = response){
  try {
    const query = {estado:true};
    const estadosUsuariosget = await estadousuario.find(query);
    
    if(estadosUsuariosget.length  == 0 ) return res.status(404).json({msg: "Estados no disponibles "});
    
    return res.status(200).json({msg: "lista de Estados", data: estadosUsuariosget});
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

}

async function crearNuevoEstado(req= request, res = response){
  try {
    const {nombre, estado} = req.body; 

    const estado_encontrado = await existeEstado(nombre); 
     if(estado_encontrado) return res.status(409). json({msg: "Ya existe el rol ingresado!"}); 
     
     const nuevoEstado = new estadousuario({nombre, estado});
       await nuevoEstado.save()
       .then(data => {
         if(data !== null){
           return res.status(201).json({msg: "Nuevo Estado creado", data: data });
         }else{
          return  res.status(500).json({msg: "Falló al agregar el nuevo estado !!!"});
         }
       })
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

     
}
async function modificarEstado(req= request, res = response){
  try {
    const {id, ...estadoModificado} = req.body;

    const estado_encontrado = await buscarId(id); 
    if(!estado_encontrado)  return res.status(404).json({msg: "Estado no encontrado"});
  
    const isUpdateOk = await modificarRoles(id,estadoModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
    }
  
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

}
async function eliminarEstado(req= request, res = response){
  try {
    const {id, ...estadoModificado} = req.body;

    const estado_encontrado = await buscarId(id); 
    if(!estado_encontrado)  return res.status(404).json({msg: "Estado no encontrado"});
  
    const isDeleteOk = await modificarRoles(id,estadoModificado); 
    if(isDeleteOk){
     return  res.status(200).json({msg: "Estado Eliminado ",data: isDeleteOk})
    }else {
      return  res.status(500).json({msg: "Falló al eliminar el estado !!!"});
    }
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }
 
}
async function obtenerEstadoUsuario(req= request, res = response){
  try {
     const {id} = req.params.id; 

     const estadoExistente = await buscarId(id);
     if (!estadoExistente) res.status(404).json({msg: "estado no encontrado!!"});

      return res.status(200).json({msg: "estado", data: estadoExistente});
  } catch (error) {
      return res.status(404).json({msg: "ERROR!!" , e: error})
  }
}
module.exports={
    obtenerEstadosUsuarios,
    crearNuevoEstado,
    modificarEstado, 
    eliminarEstado,
    obtenerEstadoUsuario
}