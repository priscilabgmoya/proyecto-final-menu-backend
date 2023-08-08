const { validationResult } = require('express-validator')


const validarCamposProducto = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors) {
        return res.status(400).json({errors})
    }
    next()
}


module.exports = {
    validarCamposProducto
}