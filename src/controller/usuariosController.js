const {request, response} = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../model/usuarios');
const {generarJWT} = require('../helpers/generarToken');
const { modificaUsuario ,buscarId} = require('../services/serviceUsuario');

async function login(req= request, res = response){
    debugger
    const {email, contraseña} = req.body;
    try {
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                msg:"Correo o contraseña incorrectos"
            })
        }

        if(usuario.estado == 'inactivo'){
            return res.status(400).json({
                msg:"Correo o contraseña incorrectos o Usuario inactivo"
            })
        }

        const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);

        if(!validPassword){
            return res.status(400).json({
                msg:"Correo o contraseña incorrectos"
            })
        }
        console.log(usuario.id);
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "usuarios logueado",
            token,
            usuario
        });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ msg: "Hable con el administrador"})
    }
}

async function obtenerUsuarios(req= request, res = response){
    const query = {estado:"activo"};
    const usuariosget = await Usuario.find(query);
    
    if(usuariosget.length  == 0 ) return res.status(404).json({msg: "Usuarios no disponibles "});
    
    return res.status(200).json({msg: "lista de usuarios", data: usuariosget});
}

async function crearNuevoUsuario( req= request, res = response){
    const bodyRequest = req.body; 
    const {nombre, email, contraseña,estado,rol} = bodyRequest; 
    
     const existeUsuario = await Usuario.findOne({email}); 
     if(existeUsuario) return res.status(409).json({msg: 'El correo se encuentra Asociado'})
     
     const nuevoUsuario = new Usuario({nombre,email,contraseña,estado,rol}); 
     
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);
    nuevoUsuario.contraseña = hash;

    await nuevoUsuario.save()
            .then(data => {
                if(data !== null){
                    return res.status(201).json({mensaje: 'Usuario Creado', data: data})
                }else{
                    return  res.status(500).json({msg: "Falló al agregar el nuevo usuario !!!"});
                }
    })
}
async function modificarUsuarioAdmin(){
    const {id, ...usuarioModificado} = req.body;

    const usuario_encontrado = await buscarId(id); 
    if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
  
    const isUpdateOk = await modificarRoles(id,usuarioModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
    }
  
}
async function modificarUsuario(){
    const {id, ...usuarioModificado} = req.body;

    const usuario_encontrado = await buscarId(id); 
    if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
  
    const isUpdateOk = await modificarRoles(id,usuarioModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
    }
  
}

async function eliminarUsuario(){
    const {id, ...usuarioEliminado} = req.body;

    const usuario_encontrado = await buscarId(id); 
    if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
  
    const isDeleteOk = await modificaUsuario(id,usuarioEliminado); 
    if(isDeleteOk){
     return  res.status(200).json({msg: "Usuario Eliminado logicamente",data: isDeleteOk})
    }else {
      return  res.status(500).json({msg: "Falló al eliminar el usuario !!!"});
    }
}
module.exports ={
    login,
    obtenerUsuarios, 
    crearNuevoUsuario, 
    eliminarUsuario,
    modificarUsuario,
    modificarUsuarioAdmin
}