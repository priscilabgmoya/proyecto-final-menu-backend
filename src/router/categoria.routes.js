const {Router} = require ('express');
const categoria = require('../model/categoria');
const { obtenerCategorias, crearNuevoCategoria, modificarCategorias, eliminarCategoria, obtenerCategoria } = require('../controller/categoria.Controller');
const { validarCategoriaNueva, validarCategoriaModificar, validarCategoriaEliminar, validarBuscarCategoriaAdmin } = require('../helpers/validacionesCategoria');
const router = Router(); 

router.get('/api/V1/categoriasMenu', obtenerCategorias);
router.get('/api/V1/categoriaMenu/:id', validarBuscarCategoriaAdmin(), obtenerCategoria);
router.post('/api/V1/nuevaCategoria' , validarCategoriaNueva(),crearNuevoCategoria); 
router.put('/api/V1/modificarCategoria', validarCategoriaModificar(), modificarCategorias); 
router.delete('/api/V1/eliminarCategoria', validarCategoriaEliminar(), eliminarCategoria);

module.exports = router; 