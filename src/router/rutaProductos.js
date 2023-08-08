const productosController = require('../controller/productosController') 

const {Router} = require('express')
const router = Router()


router
    .get('/', productosController.getAllProductos)
    .get('/:productoID', productosController.getProducto)
    .post('/', productosController.postProducto)
    .patch('/:productoID', productosController.patchProducto)
    .delete('/:productoID', productosController.deleteProducto)

module.exports = router