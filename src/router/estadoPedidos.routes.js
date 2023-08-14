const {Router} = require ('express');
const { obtenerEstadosPedidos, crearNuevoEstado, modificarEstados, eliminarEstado } = require('../controller/estadoPedidosController');
const { validarEstadoNuevo, validarEstadoModificar, validarEstadoEliminar } = require('../helpers/validacionesEstadoPedido');
const { validarPedidoNuevo } = require('../helpers/validacionesPedidos');
const router = Router(); 

router.get('/api/V1/estadoPedidos', obtenerEstadosPedidos);
router.post('/api/V1/nuevoEstadoPedido' , validarPedidoNuevo(), crearNuevoEstado); 
router.put('/api/V1/modificarEstadoPedido', validarEstadoModificar(), modificarEstados); 
router.delete('/api/V1/eliminarEstadoPedido', validarEstadoEliminar(), eliminarEstado);





module.exports = router; 