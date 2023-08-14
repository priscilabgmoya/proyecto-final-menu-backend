const Menu = require('../model/Producto')

//validamos que la cadena no sea un numero
const validarCadena = (...cadena) => {
    for(const atributo of cadena) {
        if(!isNaN(atributo)) return false
    }
    return true
}

const validarNumero = (...cadena) => {
    for(const atributo of cadena) {
        if(isNaN(atributo)) return false
    }
    return true
}


const instanciarMenu = async body => {
    debugger
    const {nombre, urlImagen, detalle, precio, categoria, publicado, descuento, porcentaje} = body

    //validamos que las cadenas sean correctas
    let cadenasValidas = await validarCadena(nombre, urlImagen, detalle, categoria)
    let numerosValidos = await validarNumero(precio, porcentaje)
    if(!cadenasValidas || !numerosValidos) {
        return {
            status: 422,
            msg: "La solicitud está bien formada pero no se pudo procesar debido a errores semánticos en los datos. Esto podría incluir validaciones fallidas o formatos incorrectos.",
            unMenu: null
        }
    }
    const unMenu = await new Menu({nombre, urlImagen, detalle, precio, categoria, publicado, descuento, porcentaje})

    //validamos que solo haya un producto con ese nombre
    let existeMenu = await Menu.findOne({nombre})
    if(existeMenu) 
        return {
            status: 409,
            msg: "ERROR! ya se encuentra un producto con ese nombre en la Base de Datos",
            unMenu: null
        } 
    return {
        status: 200,
        msg: "OK",
        unMenu
    }

}





module.exports = { instanciarMenu }