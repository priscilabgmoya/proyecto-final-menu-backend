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
    // asi hacemos para que no se  modiquen los datos del cliente desde el backend (yo puedo entrar a postman y agregar mas campos al body)
    debugger
    const datos = req.body
    const nuevoMenu = await instanciarMenu(datos)
    const {status, msg, unMenu} = nuevoMenu
    res.status(status).json({msg, unMenu})
    //encriptacion (en este caso no hay nada por encriptar ya que esto es comida y no datos sencibles)
    status === 200 ? await unMenu.save().then(res => console.log(res)) : null
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