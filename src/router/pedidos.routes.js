
const {Router} = require ('express');
const {guardarPedido, mostrarPedidos, modificarEstadoPedido, eliminarPedido} = require ('../controller/pedidosController');
const {validarPedidoNuevo, validarMostrarPedido, validarEstadoPedido, validarEliminarEstadoPedido} = require ('../helpers/validacionesPedidos');
const router = Router();

router.get('/api/V1/mostrarPedidos', mostrarPedidos ); 
router.post('/api/V1/pedidos', validarPedidoNuevo(), guardarPedido);
router.post('/api/V1/pedidoNuevo', modificarEstadoPedido); 
router.delete('/api/V1/eliminarPedido', validarEliminarEstadoPedido(), eliminarPedido);


module.exports = router;
