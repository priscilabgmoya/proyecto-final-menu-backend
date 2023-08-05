const {Router} = require ('express');
const Usuario = require('../model/usuarios');
const {crearNuevoUsuario } = require('../controller/usuariosController'); 
const router = Router(); 
// entre la ruta y los usuarios van las validaciones
router.get('/api/v1/ObtenerUsuarios', crearNuevoUsuario)
//! ES un ejemplo
module.exports = router; 