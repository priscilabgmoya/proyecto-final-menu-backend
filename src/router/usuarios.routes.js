const {Router} = require ('express');
const {crearNuevoUsuario, obtenerUsuarios, login, eliminarUsuario } = require('../controller/usuariosController'); 
const { validarNuevoUsuario, validarLogin, validarUsuarioEliminar } = require('../helpers/validacionesUsuarios');
const router = Router(); 

router.post('/api/V1/login',validarLogin(),login);
router.get('/api/V1/obtenerUsuarios', obtenerUsuarios); 
router.post('/api/V1/crearNuevoUsuario', validarNuevoUsuario() ,crearNuevoUsuario); 
router.delete('/api/V1/eliminarUsuario', validarUsuarioEliminar(), eliminarUsuario)


module.exports = router; 