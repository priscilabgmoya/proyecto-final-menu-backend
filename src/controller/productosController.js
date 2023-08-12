//esta linea me sirve para aplicar metodos como el req.body entre otros
const { request, response } = require('express')
const { existeMenu } = require('../helpers/helperProducto')

const Menu = require('../model/Producto')
const { instanciarMenu } = require('../services/servicioProducto')

const getAllProductos = async (req = request, res = response) => {
    const { desde, limite } = req.query
    const query = { publicado: true }
    // const menues = await Menu.find().skip(desde).limit(limite)
    // const count = await Menu.countDocuments() //trae la cantidad de documentos de mi coleccion
    
    //para optimizar tiempo de respuesta usar Promise all
    
    const [menues, count] = await Promise.all([
        Menu.find(query).skip(desde).limit(limite).exec(),
        Menu.countDocuments().exec()
    ])
    return res.status(200).json({count, menues})
}

const getProducto = (req = request, res = response) =>  {
    const id = req.params.productoID
    Menu
        .findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.json(500).json({msg: "error en la peticion GET", err}))
}

const postProducto = async (req = request, res = response) => {

    const datos = req.body
    const {nombre, urlImagen, detalle, precio, categoria, publicado, combo, descuento, porcentaje} = datos
    const siExiste = await existeMenu(nombre)
    if(siExiste) 
        return res.status(400).json({msg:`El menu '${nombre}' ya se encuentra en la db`})
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

const putProducto = async (req = request, res = response) => {
    const id = req.params.productoID
    console.log(req.body)
    const menuActualizado = await Menu.findByIdAndUpdate(id, req.body, { new: true })
    console.log(menuActualizado)
    !menuActualizado 
        ? res.status(500).json({msg: "Error en peticion PUT de producto", menuActualizado})
        : res.status(200).json({msg: "menu actualizado", menuActualizado})
}

const deleteProducto = async (req = request, res = response) => {
    const {id} = req.params
    const menu = await Menu.findById(id)
    if(!menu)
        return res.status(500).json({msg: "El menu ya esta inactivo", menu})
    const menuDesactivado = await Menu.findByIdAndUpdate(id, {publicado: false}, { new: true})
    res.status(200).json({msg: "menu desactivado", menu})

}


module.exports = {
    getAllProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}