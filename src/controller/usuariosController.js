const {request, response} = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../model/usuarios');
const {generarJWT} = require('../helpers/generarToken');
const jwt = require('jsonwebtoken');
const { modificaUsuario ,buscarId} = require('../services/serviceUsuario');

async function login(req= request, res = response){
    const {email, contraseña} = req.body;
    try {
        const usuario = await Usuario.findOne({email}).populate('rol', 'rol').populate('estado', 'nombre');
        console.log(usuario);
        if(!usuario){
            return res.status(400).json({
                msg:"Correo o contraseña incorrectos"
            })
        }

        if(usuario.estado.nombre == 'inactivo'){
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
        res.cookie('xToken' , token);
        res.set("Access-Control-Allow-Credentials", "true");
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
    debugger
    const query = {estado:"64cd7db92a13bbf308f05c84"};
    const usuariosget = await Usuario.find(query).populate('rol', 'rol').populate('estado', 'nombre');
    console.log(usuariosget)
    if(usuariosget.length  == 0 ) return res.status(404).json({msg: "Usuarios no disponibles "});
    
    return res.status(200).json({msg: "lista de usuarios", data: usuariosget});
}

async function crearNuevoUsuarioAdmin( req= request, res = response){
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
                    return res.status(201).json({msg: 'Usuario Creado', data: data})
                }else{
                    return  res.status(500).json({msg: "Falló al agregar el nuevo usuario !!!"});
                }
    })
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
async function modificarUsuarioAdmin(req= request, res = response){
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
async function modificarUsuario(req= request, res = response){
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

async function eliminarUsuario(req= request, res = response){
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
async function verificarToken (req= request, res = response) {

    const {jwToken }= req.body; 


    if(!jwToken) return res.status(401).json({msg: "No Autorizado, no se ingreso un Token!!"});
    jwt.verify(jwToken, process.env.SECRETORPRIVATEKEY, async (err, user) => {

        if(err) return res.status(401).json({msg: "No Autorizado!!"});
        const usuario_encontrado = await buscarId(user.uid); 
        if(!usuario_encontrado) return res.status(401).json({msg: "No Autorizado, usuario no encontrado!!"});
        console.log(usuario_encontrado);
        return res.json({
            id: usuario_encontrado._id, 
            nombre: usuario_encontrado.nombre,
            correo: usuario_encontrado.email,
            rol: usuario_encontrado.rol,
            estado: usuario_encontrado.estado
        })
    })
    
}

module.exports ={
    login,
    obtenerUsuarios, 
    crearNuevoUsuarioAdmin, 
    crearNuevoUsuario, 
    eliminarUsuario,
    modificarUsuario,
    modificarUsuarioAdmin,
    verificarToken,
}