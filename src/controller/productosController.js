//esta linea me sirve para aplicar metodos como el req.body entre otros
const { request, response } = require('express')

const Menu = require('../model/Producto')
const { instanciarMenu } = require('../servicios/servicioProducto')

const getAllProductos = (req = request, res = response) => {
    res.send(`<h1>Trayendo todos los productos desde la url${req.baseUrl}</h1>`)
}

const getProducto = (req = request, res = response) =>  {
    res.send(`<h1>Trayendo el producto ${req.params.productoID} desde la url${req.baseUrl}</h1>`)
}

const postProducto = async (req = request, res = response) => {

    const datos = req.body
    const {nombre, urlImagen, detalle, precio, categoria, publicado, combo, descuento, porcentaje} = datos
    const nuevoMenu = await new Menu( { 
        nombre, 
        urlImagen, 
        detalle, 
        precio, 
        categoria, 
        publicado, 
        combo, 
        descuento, 
        porcentaje
    } )
    nuevoMenu
        .save()
        .then(doc => res.status(200).json({msg: "producto cargado exitosamente", doc}))
        .catch(doc => res.status(500).json({msg: "error al cargar a la base de datos", doc}))
}

const patchProducto = (req = request, res = response) => {
    res.send(`<h1>Actualizando el producto ${req.params.productoID} desde la url${req.baseUrl}</h1>`)
}

const deleteProducto = (req = request, res = response) => {
    res.send(`<h1>Eliminando el producto ${req.params.productoID} desde la url${req.baseUrl}</h1>`)
}


module.exports = {
    getAllProductos,
    getProducto,
    postProducto,
    patchProducto,
    deleteProducto
}