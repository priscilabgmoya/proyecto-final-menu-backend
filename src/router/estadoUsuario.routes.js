const {Router} = require ('express');
const { obtenerEstadosUsuarios, crearNuevoEstado, modificarEstado, eliminarEstado, obtenerEstadoUsuario } = require('../controller/estadoUsuariosController');
const { validarEstadoNuevo, validarEstadoModificar, validarEstadoEliminar, validarBuscarEstadoUsuarioAdmin } = require('../helpers/validacionesEstadoUsuario');
const router = Router(); 

router.get('/api/V1/estadoUsuarios', obtenerEstadosUsuarios);
router.get('/api/V1/estadoUsuario/:id', validarBuscarEstadoUsuarioAdmin(),obtenerEstadoUsuario)
router.post('/api/V1/nuevoEstado' , validarEstadoNuevo(), crearNuevoEstado); 
router.put('/api/V1/modificarEstado', validarEstadoModificar(), modificarEstado); 
router.delete('/api/V1/eliminarEstado', validarEstadoEliminar(), eliminarEstado);





module.exports = router; 