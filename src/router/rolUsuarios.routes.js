const {Router} = require ('express');
const {obtenerRolesUsuarios, crearNuevoRol , modificarRol , eliminarRol, obtenerRolUsuario} = require('../controller/rolUsuarioController'); 
const { validarRolNuevo, validarRolModificar, validarRolEliminar, validarBuscarRolAdmin } = require('../helpers/validacionRolUsuario');
const router = Router(); 

router.get('/api/V1/rolesUsuario', obtenerRolesUsuarios); 
router.get('/api/V1/rolUsuario/:id', validarBuscarRolAdmin(), obtenerRolUsuario);
router.post('/api/V1/nuevoRol', validarRolNuevo() ,crearNuevoRol);
router.put('/api/V1/modificarRol',  validarRolModificar(), modificarRol); 
router.delete('/api/V1/eliminarRol', validarRolEliminar(), eliminarRol); 

module.exports = router; 