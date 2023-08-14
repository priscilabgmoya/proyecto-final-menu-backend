const {Router} = require ('express');
const { obtenerEstadosPedidos, crearNuevoEstado, modificarEstados, eliminarEstado, obtenerEstadoPedido } = require('../controller/estadoPedidosController');
const { validarEstadoNuevo, validarEstadoModificar, validarEstadoEliminar, validarBuscarEstadoPedidoAdmin } = require('../helpers/validacionesEstadoPedido');
const router = Router(); 

router.get('/api/V1/estadoPedidos', obtenerEstadosPedidos);
router.get('/api/V1/estadoPedido/:id', validarBuscarEstadoPedidoAdmin(),obtenerEstadoPedido);
router.post('/api/V1/nuevoEstadoPedido' , validarEstadoNuevo(), crearNuevoEstado); 
router.put('/api/V1/modificarEstadoPedido', validarEstadoModificar(), modificarEstados); 
router.delete('/api/V1/eliminarEstadoPedido', validarEstadoEliminar(), eliminarEstado);





module.exports = router; 