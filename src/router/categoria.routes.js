const {Router} = require ('express');
const categoria = require('../model/categoria');
const router = Router(); 

application.get('/', (req, res) => {
res.send(categoria)
})
//Nose si estaria bien 
module.exports = router; 