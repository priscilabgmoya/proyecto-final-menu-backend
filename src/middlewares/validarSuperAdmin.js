const {request, response} = require('express');


const esSuperAdmin = (req = request, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere validar el rol sin validar el token"
        })
    }

    const {rol, nombre} = req.usuario

    if(rol !== "superAdmin"){
        return res.status(401).json({
            msg:`${nombre} no es superAdmin`
        })
    }
    
    next();
}

module.exports = {
    esSuperAdmin
}