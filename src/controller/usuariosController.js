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

    try {
        const query = {estado:"64cd7db92a13bbf308f05c84"};
        const usuariosget = await Usuario.find(query).populate('rol', 'rol').populate('estado', 'nombre');
        if(usuariosget.length  == 0 ) return res.status(404).json({msg: "Usuarios no disponibles "});
        
        return res.status(200).json({msg: "lista de usuarios", data: usuariosget});
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }

}

async function crearNuevoUsuario( req= request, res = response){
    try {
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
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
}
async function modificarUsuario(req= request, res = response){
    try {
        const {id, ...usuarioModificado} = req.body;

        const usuario_encontrado = await buscarId(id); 
        if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});
      
        const validPassword = bcrypt.compareSync( usuarioModificado.contraseñaActual,usuario_encontrado.contraseña);

        if(!validPassword){
            return res.status(400).json({
                msg:"Correo o contraseña incorrectos"
            })
        }
        let usuarioNuevaModificacion = {
            nombre: usuarioModificado.nombre,
            email: usuarioModificado.email,
            contraseña: ""
        }
        if(usuarioModificado.contraseña && validPassword){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(usuarioModificado.contraseña, salt);
            usuarioNuevaModificacion.contraseña = hash;
        }
        const isUpdateOk = await modificaUsuario(id,usuarioNuevaModificacion); 
        if(isUpdateOk){
         return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
        }else {
          return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
        } 
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
}

async function modificarUsuarioAdmin(req= request, res = response){

    try {
        const {id, ...usuarioModificado} = req.body;

        const usuario_encontrado = await buscarId(id); 
        if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});

        const isUpdateOk = await modificaUsuario(id,usuarioModificado); 
        if(isUpdateOk){
         return  res.status(200).json({msg: "Estado Modificado",data: isUpdateOk})
        }else {
          return  res.status(500).json({msg: "Falló al modificar el estado !!!"});
        } 
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
}
async function eliminarUsuario(req= request, res = response){
    try {
        const {id, ...usuarioEliminado} = req.body;

        const usuario_encontrado = await buscarId(id); 
        if(!usuario_encontrado)  return res.status(404).json({msg: "Usuario no encontrado"});

        const isDeleteOk = await modificaUsuario(id,usuarioEliminado); 

        if(isDeleteOk){
         return  res.status(200).json({msg: "Usuario Eliminado",data: isDeleteOk})
        }else {
          return  res.status(500).json({msg: "Falló al eliminar el usuario !!!"});
        }
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }

}
async function verificarToken (req= request, res = response) {

    try {
        const {jwToken }= req.body; 


    if(!jwToken) return res.status(401).json({msg: "No Autorizado, no se ingreso un Token!!"});
    jwt.verify(jwToken, process.env.SECRETORPRIVATEKEY, async (err, user) => {

        if(err) return res.status(401).json({msg: "No Autorizado!!"});
        const usuario_encontrado = await buscarId(user.uid); 
        if(!usuario_encontrado) return res.status(401).json({msg: "No Autorizado, usuario no encontrado!!"});

        return res.json({
            id: usuario_encontrado._id, 
            nombre: usuario_encontrado.nombre,
            correo: usuario_encontrado.email,
            rol: usuario_encontrado.rol,
            estado: usuario_encontrado.estado
        })
    })
    } catch (error) {
       return res.status(404).json({msg: "ERROR!!" , e: error})
    }
    
    
}

async function obtenerUsuario(req= request, res = response){
    try {
       const {id} = req.params; 

       const usuarioExistente = await buscarId(id);
       if (!usuarioExistente) res.status(404).json({msg: "usuario no encontrado!!"});

        return res.status(200).json({msg: "usuario", data: usuarioExistente});
    } catch (error) {
        return res.status(404).json({msg: "ERROR!!" , e: error})
    }
}
module.exports ={
    login,
    obtenerUsuarios, 
    crearNuevoUsuario, 
    eliminarUsuario,
    modificarUsuario,
    verificarToken,
    obtenerUsuario,
    modificarUsuarioAdmin
}