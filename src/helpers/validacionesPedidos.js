const { body } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarCampos');

module.exports.validarPedidoNuevo = function () {
    return [
        validarJWT,
        esSuperAdmin,
        body ("usuario", 'El usuario es requerido').isObject().notEmpty(),
        body("fecha", 'La fecha es requerida').isDate().notEmpty(),
        body ("menu", 'El menu es requerido').isArray().notEmpty(),
        body("estado", 'El estado es requerido').isString().notEmpty(),
        validarCampos
    ]
}

module.exports.validarMostrarPedido = function (){
    return [
        validarJWT,
        esSuperAdmin,
        body ("id","id Invalido!").isMongoId(),
        body ("menu", 'El menu es requerido').isArray().notEmpty(),
        body("estado", 'El estado es requerido').isString().notEmpty(),
        validarCampos
    ]
}

module.exports.validarEstadoPedido = function (){
    return [
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado es requerido').isString().notEmpty(),
        validarCampos
    ]
}

module.exports.validarEliminarEstadoPedido = function (){
    return [
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado es requerido').isString().notEmpty(),
        validarCampos
    ]
}