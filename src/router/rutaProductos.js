
const productosController = require('../controller/productosController') 
const { check } = require('express-validator')
const { validarCamposProducto } = require('../middlewares/validarCampos')
const {Router} = require('express')
const { existeMenu } = require('../helpers/helperProducto')
const router = Router()

router
    .get('/', productosController.getAllProductos)
    .get('/:productoID', productosController.getProducto)
    .post('/', [
        check("nombre","Nombre vacio").notEmpty(),
        check("urlImagen", "la url de la imagen es obligatorio").notEmpty(),
        check("detalle", "Debe añadir una descripción del menú").notEmpty(),
        check("precio", "No ingreso un precio al Menu").isNumeric(),
        check("categoria", "Debe ingresar una categoria valida").notEmpty(),
        check("porcentaje", "Debe ingresar un porcentaje").isInt(),
        validarCamposProducto
    ], productosController.postProducto)
    .put('/:productoID', [
        check('productoID', "ID invalido").isMongoId(),
        validarCamposProducto
    ], productosController.putProducto)
    .delete('/:productoID', [
        check('productoID', "ID invalido").isMongoId(),
        check('productoID').custom(existeMenu),
        validarCamposProducto
    ], productosController.deleteProducto)

module.exports = router