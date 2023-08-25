const {Router} = require ('express');
const {crearNuevoUsuario, obtenerUsuarios, login, eliminarUsuario, modificarUsuario,  verificarToken, obtenerUsuario, modificarUsuarioAdmin} = require('../controller/usuariosController'); 
const { validarNuevoUsuarioAdmin, validarLogin, validarUsuarioEliminar ,validarNuevoUsuario, validarUsuarioMoficadoAdmin, validarUsuarioMoficado, validarBuscarUsuario, validarBuscarUsuarioAdmin} = require('../helpers/validacionesUsuarios');
const router = Router() ; 

router.post('/api/V1/login',validarLogin(),login);
router.get('/api/V1/obtenerUsuarios', obtenerUsuarios); 
router.get('/api/V1/obtenerUsuarioAdmin/:id',obtenerUsuario);
router.get('/api/V1/obtenerUsuario/:id',obtenerUsuario);
router.post('/api/V1/verificarToken', verificarToken); 
router.post('/api/V1/crearNuevoUsuarioAdmin', validarNuevoUsuarioAdmin() ,crearNuevoUsuario); 
router.post('/api/V1/crearNuevoUsuario', validarNuevoUsuario() ,crearNuevoUsuario); 
router.put('/api/V1/modificarUsuarioAdmin',validarUsuarioMoficadoAdmin(),modificarUsuarioAdmin);
router.put('/api/V1/modificarUsuario',validarUsuarioMoficado(),modificarUsuario);
router.delete('/api/V1/eliminarUsuario', validarUsuarioEliminar(), eliminarUsuario); 

module.exports = router; 