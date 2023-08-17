const productosController = require('../controller/productosController') 
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const {Router} = require('express')
const { existeMenu } = require('../helpers/helperProducto')
const { validarJWT } = require('../middlewares/validarToken')
const { esAdminRol } = require('../middlewares/validarAdminRol')
const router = Router()

router
    .get('/', productosController.getAllProductos)
    .get('/productoAdmin',  productosController.getAllProductosAdmin) 
    .get('/:productoID', productosController.getProducto)
    .post('/', [
        validarJWT,
        esAdminRol,
        check("nombre","Nombre vacio").notEmpty(),
        check("urlImagen", "la url de la imagen es obligatorio").notEmpty(),
        check("detalle", "Debe añadir una descripción del menú").notEmpty(),
        check("precio", "No ingreso un precio al Menu").isNumeric(),
        check("categoria", "Debe ingresar una categoria valida").notEmpty(),
        check("porcentaje", "Debe ingresar un porcentaje").isInt(),
        validarCampos
    ], productosController.postProducto)
    .put('/:productoID', [
        validarJWT,
        esAdminRol,
        check('productoID', "ID invalido").isMongoId(),
        validarCampos
    ], productosController.putProducto)
    .delete('/:productoID', [
        check('productoID', "ID invalido").isMongoId(),
        check('productoID').custom(existeMenu),
        validarCampos
    ], productosController.deleteProducto)

module.exports = router