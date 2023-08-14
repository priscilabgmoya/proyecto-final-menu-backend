const {request, response} = require('express'); 
const Categoria = require('../model/categoria');
const { existeCategoria,buscarId, modificarCategoria } = require('../services/serviceCategorias');

async function obtenerCategorias( req= request, res = response){
  try {
    const query = {estado:true};
const categoriasGet = await Categoria.find(query);

if(categoriasGet.length  == 0 ) return res.status(404).json({msg: "Categorias no disponibles "});

return res.status(200).json({msg: "lista de roles", data: categoriasGet});
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

}

async function crearNuevoCategoria (req= request, res = response) {
  try {
    const {nombre, estado} = req.body; 

    const categoria_encontrado = await existeCategoria(nombre); 
     if(categoria_encontrado) return res.status(409). json({msg: "Ya existe la categoria ingresada!"}); 
     
     const nuevaCategoria = new Categoria({nombre, estado});
       await nuevaCategoria.save()
       .then(data => {
         if(data !== null){
           return res.status(201).json({msg: "Nuevo categoria creada", data: data });
         }else{
          return  res.status(500).json({msg: "Falló al agregar la  nueva categoria  !!!"});
         }
       })
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

    
}
async function modificarCategorias (req= request, res = response){
  try {
    const {id, ...categoriaModificado} = req.body;

    const categoria_encontrado = await buscarId(id); 
    if(!categoria_encontrado)  return res.status(404).json({msg: "Rol no encontrado"});
  
    const isUpdateOk = await modificarCategoria(id,categoriaModificado); 
    if(isUpdateOk){
     return  res.status(200).json({msg: "Categoria Modificado",data: isUpdateOk})
    }else {
      return  res.status(500).json({msg: "Falló al modificar la categoria !!!"});
    }
  
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

}
async function eliminarCategoria(req= request, res = response){
  try {
    const {id, ...categoriaModificado} = req.body;

    const categoria_encontrado = await buscarId(id); 
    if(!categoria_encontrado)  return res.status(404).json({msg: "Categoria no encontrado"});
  
    const isDeleteOk = await modificaRoles(id,categoriaModificado); 
    if(isDeleteOk){
     return  res.status(200).json({msg: "categoria Eliminada ",data: isDeleteOk})
    }else {
      return  res.status(500).json({msg: "Falló al eliminar la categoria !!!"});
    }
  } catch (error) {
    return res.status(404).json({msg: "ERROR!!" , e: error})
  }

}
async function obtenerCategoria(req= request, res = response){
  try {
     const {id} = req.params.id; 

     const categoriaExistente = await buscarId(id);
     if (!categoriaExistente) res.status(404).json({msg: "categoria no encontrado!!"});

      return res.status(200).json({msg: "usuario", data: categoriaExistente});
  } catch (error) {
      return res.status(404).json({msg: "ERROR!!" , e: error})
  }
}
module.exports = {
    obtenerCategorias,
    crearNuevoCategoria,
    modificarCategorias,
    eliminarCategoria,
    obtenerCategoria
}