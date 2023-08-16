const { body, check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarToken');
const { esAdminRol } = require('../middlewares/validarAdminRol');

module.exports.validarPedidoNuevo = function () {
    return [
        validarJWT,
        body ("usuario","id Invalido!").isMongoId().notEmpty().isString(),
        body("fecha", 'La fecha es requerida').isDate().notEmpty(),
        body ("menu", 'El menu es requerido').isArray().notEmpty(),
        body("estado", 'El estado es requerido').isString().notEmpty().isMongoId(),
        body("precio", 'El precio es requerido').isString().notEmpty(),
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
module.exports.validarBuscarPedidoAdmin = function (){
    return [
        validarJWT,
        esAdminRol,
        check ("id","id Invalido!").isMongoId(),
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