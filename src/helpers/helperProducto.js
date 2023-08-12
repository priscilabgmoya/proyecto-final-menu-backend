const Menu = require('../model/Producto')


const existeMenu = async (nombre) => {
    return await Menu.findOne({ nombre })
}



module.exports = {
    existeMenu
}