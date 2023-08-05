const { body } = require('express-validator'); 
const ER = require('./expresionesRegulares');
const { validarCampos } = require('../middlewares/validarCampos');

module.exports.validarEstadoNuevo = function () {
    return [
        body ("nombre", 'El tipo de rol es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("estado", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarEstadoModificar = function() {
    return [
        body ("id","id Invalido!").isMongoId(),
        body ("nombre", 'El nombre del estado es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("estado", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarEstadoEliminar = function() {
    return [
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}