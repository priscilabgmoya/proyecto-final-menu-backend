const { body } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esAdminRol } = require('../middlewares/validarAdminRol');

module.exports.validarPedidoNuevo = function () {
    return [
        validarJWT,
        body ("usuario","id Invalido!").isMongoId().notEmpty().isString(),
       /* body("fecha", 'La fecha es requerida').isDate().notEmpty(),*/
        body ("menu", 'El menu es requerido').isArray().notEmpty(),
        body("estado", 'El estado es requerido').isString().notEmpty().isMongoId(),
        validarCampos
    ]
}

module.exports.validarMostrarPedido = function (){
    return [
        validarJWT,
        esAdminRol,
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado es requerido').isString().notEmpty().isMongoId(),
        validarCampos
    ]
}

module.exports.validarEstadoPedido = function (){
    return [
        validarJWT,
        esAdminRol,
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado es requerido').isMongoId().notEmpty().isString(),
        validarCampos
    ]
}

module.exports.validarEliminarEstadoPedido = function (){
    return [
        validarJWT,
        esAdminRol,
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado es requerido').isString().notEmpty().isMongoId(),
        validarCampos
    ]
}