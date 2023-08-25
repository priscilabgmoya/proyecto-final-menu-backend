const {Router} = require ('express');
const { dataInicial, pagarPedido } = require('../controller/mercadoPagoController');
const router = Router();

router.get('/api/V1/mercadoPago',dataInicial);
router.post('/api/V1/create_preference',pagarPedido)


module.exports = router; 