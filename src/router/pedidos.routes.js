
const {Router} = require ('express');
const {guardarPedido, mostrarPedidos, modificarEstadoPedido, eliminarPedido} = require ('../controller/pedidosController');
const {validarPedidoNuevo, validarMostrarPedido, validarEstadoPedido, validarEliminarEstadoPedido} = require ('../helpers/validacionesPedidos');
const router = Router();

router.post('/api/V1/pedidos',guardarPedido(),validarEstadoPedido);
router.get('/api/V1/mostrarPedidos', mostrarPedidos() , validarMostrarPedido); 
router.post('/api/V1/pedidoNuevo', validarPedidoNuevo(), modificarEstadoPedido); 
router.delete('/api/V1/eliminarPedido', validarEliminarEstadoPedido(), eliminarPedido)


module.exports = router;
