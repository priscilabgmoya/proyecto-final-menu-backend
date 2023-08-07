const { body } = require('express-validator'); 
const ER = require('./expresionesRegulares');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarEstado } = require('../services/serviceEstadoUsuario');
const { validarRol } = require('../services/serviceRolUsuarios');
const { validarJWT } = require('../middlewares/validarToken');
const { esAdminRol } = require('../middlewares/validarAdminRol');

module.exports.validarNuevoUsuario = function() {
    return [
       /* validarJWT,
        esAdminRol,*/
        body ("nombre", "nombre es requerido").isString().notEmpty().matches(ER.ExpRegNombre),
        body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
        body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
        body ("estado").isString().notEmpty().custom(validarEstado).matches(ER.ExpRegTexto),
        body ("rol").isString().notEmpty().custom(validarRol).matches(ER.ExpRegTexto),
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
        /*validarJWT,
        esAdminRol,*/
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado del usuario  es requerido').isString().notEmpty(),
        validarCampos
    ]
}

module.exports.validarUsuarioMoficadoAdmin = function (){
    return [
        /*validarJWT,
        esAdminRol,*/
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado del usuario  es requerido').isString().notEmpty(),
        body ("rol").isString().notEmpty().custom(validarRol).matches(ER.ExpRegTexto),
        validarCampos
    ]
}
module.exports.validarUsuarioMoficado = function (){
    return [
        /* validarJWT,
         esAdminRol,*/
         body ("nombre", "nombre es requerido").isString().notEmpty().matches(ER.ExpRegNombre),
         body ("email", "Email es requerido").isEmail().notEmpty().matches(ER.ExpRegEmail),
         body ("contraseña", "Contraseña es requerida").isLength({min: 8}).matches(ER.ExpRegPass),
         validarCampos
     ]
}