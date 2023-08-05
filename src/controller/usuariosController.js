const {request, response} = require('express'); 
const Usuario = require('../model/usuarios');
// para el metodo post / crear un nuevo usuario / crear nuevo menu / crear un nuevo pedido
async function crearNuevoUsuario( req= request, res = response){
    const bodyRequest = req.body; 
    //verificar que no se mande campos vacios
    const {nombre, correo, contraseña, rol} = bodyRequest; 
    // verificamos si existe en la base de datos
    const existeUsuario = await Usuario.findOne({correo}); 
    if(existeUsuario) return res.status(409).json({msg: 'El correo se encuentra Asociado'})
    
    const nuevoUsuario = new Usuario({nombre,correo,contraseña,rol}); 
    await nuevoUsuario.save()
            .then(data => {
                //ver que clase de artilugio se puede aplicar
                if(data._id){
                    return res.status(201).json({mensaje: 'Usuario Creado', data: data})
                }
    })
}

module.exports ={
    crearNuevoUsuario, 
}