const { body } = require('express-validator'); 
const ER = require('./expresionesRegulares');
const { validarCampos } = require('../middlewares/validarCampos');

module.exports.validarRolNuevo = function () {
    return [
        body ("rol", 'El tipo de rol es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("estado", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarRolModificar = function() {
    return [
        body ("id","id Invalido!").isMongoId(),
        body ("rol", 'El tipo de rol es requerido').isString().notEmpty().matches(ER.ExpRegTexto),
        body("estado", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}
module.exports.validarRolEliminar = function() {
    return [
        body ("id","id Invalido!").isMongoId(),
        body("estado", 'El estado del rol  es requerido').isBoolean().notEmpty(),
        validarCampos
    ]
}