const { body } = require('express-validator'); 
const ER = require('./expresionesRegulares');
const { validarCampos } = require('../middlewares/validarCampos');

module.exports.validarNuevoUsuario = function() {
    return [
        body ("Nombre").isString().notEmpty().matches(ER.ExpRegNombre),
        body ("Email").isEmail().notEmpty().matches(ER.ExpRegEmail).custom(),
        body ("Contraseña").isLength({min: 8}).matches(ER.ExpRegPass),
        body ("estado"),
        body ("rol"),
        validarCampos
    ]
}
