const {Router} = require ('express');
const { dataInicial, pagarPedido } = require('../controller/mercadoPagoController');
const router = Router();

router.get('/',dataInicial);
router.post('/create_preference',pagarPedido)


module.exports = router; 