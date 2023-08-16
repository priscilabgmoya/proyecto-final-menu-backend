const {Router} = require ('express');
const {guardarPedido, mostrarPedidos, modificarEstadoPedido, eliminarPedido, obtenerPedido} = require ('../controller/pedidosController');
const {validarPedidoNuevo, validarEstadoPedido, validarEliminarEstadoPedido, validarBuscarPedidoAdmin} = require ('../helpers/validacionesPedidos');
const router = Router();

router.get('/api/V1/mostrarPedidos', mostrarPedidos); 
router.get('/api/V1/mostrarPedidoAdmin', validarBuscarPedidoAdmin(), obtenerPedido); 
router.post('/api/V1/pedidos', validarPedidoNuevo(), guardarPedido);
router.post('/api/V1/pedidoNuevo', validarEstadoPedido(), modificarEstadoPedido); 
router.delete('/api/V1/eliminarPedido', validarEliminarEstadoPedido(), eliminarPedido);


module.exports = router;
