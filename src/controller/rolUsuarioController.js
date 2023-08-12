const {request, response} = require('express'); 
const rolusuarios = require('../model/rolUsuario.js');
const {existeRol,modificaRoles,buscarId} = require('../services/serviceRolUsuarios.js');

async function obtenerRolesUsuarios( req= request, res = response){
const query = {estado:true};
const rolUsuariosget = await rolusuarios.find(query);

if(rolUsuariosget.length  == 0 ) return res.status(404).json({msg: "Roles no disponibles "});

return res.status(200).json({msg: "lista de roles", data: rolUsuariosget});
}

async function crearNuevoRol (req= request, res = response) {
   const {rol, estado} = req.body; 

   const rol_encontrado = await existeRol(rol); 
    if(rol_encontrado) return res.status(409). json({msg: "Ya existe el rol ingresado!"}); 
    
    const nuevoRol = new rolusuarios({rol, estado});
      await nuevoRol.save()
      .then(data => {
        if(data !== null){
          return res.status(201).json({msg: "Nuevo rol creado", data: data });
        }else{
         return  res.status(500).json({msg: "Falló al agregar el nuevo rol !!!"});
        }
      })
    
}
async function modificarRol(req= request, res = response){

  const {id, ...rolModificado} = req.body;

  const rol_encontrado = await buscarId(id); 
  if(!rol_encontrado)  return res.status(404).json({msg: "Rol no encontrado"});

  const isUpdateOk = await modificaRoles(id,rolModificado); 
  if(isUpdateOk){
   return  res.status(200).json({msg: "Rol Modificado",data: isUpdateOk})
  }else {
    return  res.status(500).json({msg: "Falló al modificar el rol !!!"});
  }

}
async function eliminarRol(req= request, res = response){
  const {id, ...estadoModificado} = req.body;

  const rol_encontrado = await buscarId(id); 
  if(!rol_encontrado)  return res.status(404).json({msg: "Rol no encontrado"});

  const isDeleteOk = await modificaRoles(id,estadoModificado); 
  if(isDeleteOk){
   return  res.status(200).json({msg: "Rol Eliminado logicamente",data: isDeleteOk})
  }else {
    return  res.status(500).json({msg: "Falló al eliminar el rol !!!"});
  }
}
module.exports = {
    obtenerRolesUsuarios,
    crearNuevoRol,
    modificarRol,
    eliminarRol
}