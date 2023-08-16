const { body, check } = require('express-validator'); 
const ER = require('./expresionesRegulares');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esAdminRol } = require('../middlewares/validarAdminRol');

module.exports.validarNuevoUsuario = function() {
    return [
        body ("nombre", "nombre es requerido").isString().notEmpty().matches(ER.ExpRegNombre),
        body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
        body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
        body ("estado").isString().notEmpty().isMongoId(),
        body ("rol").isString().notEmpty().isMongoId(),
        validarCampos
    ]
}
module.exports.validarNuevoUsuarioAdmin = function() {
    return [
       validarJWT,
        esAdminRol,
        body ("nombre", "nombre es requerido").isString().notEmpty().matches(ER.ExpRegNombre),
        body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
        body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
        body ("estado", 'El estado del usuario  es requerido').isString().notEmpty().isMongoId(),
        body ("rol", 'El rol del usuario  es requerido').isString().notEmpty().isMongoId(), 
        validarCampos
    ]
}
module.exports.validarLogin = function(){
    return [
        body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
        body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
        validarCampos
    ]
}

module.exports.validarUsuarioEliminar = function() {
    return [
        validarJWT,
        esAdminRol,
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado del usuario  es requerido').isString().notEmpty().isMongoId(),
        validarCampos
    ]
}

module.exports.validarUsuarioMoficadoAdmin = function (){
    return [
        validarJWT,
        esAdminRol,
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado del usuario  es requerido').isString().notEmpty().isMongoId(),
        body ("rol", 'El rol del usuario  es requerido').isString().notEmpty().isMongoId(),
        validarCampos
    ]
}
module.exports.validarUsuarioMoficado = function (){
    return [
         validarJWT,
         body ("id","id Invalido!").isMongoId(),
         body ("nombre", "nombre es requerido").isString().notEmpty().matches(ER.ExpRegNombre),
         body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
         body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
         validarCampos
     ]
}

module.exports.validarBuscarUsuarioAdmin = function (){
    return [
        validarJWT,
        esAdminRol,
        check ("id","id Invalido!").isMongoId(),
        validarCampos
    ]
}
module.exports.validarBuscarUsuario = function (){
    return [
         validarJWT,
         check ("id","id Invalido!").isMongoId(),
         validarCampos
     ]
}