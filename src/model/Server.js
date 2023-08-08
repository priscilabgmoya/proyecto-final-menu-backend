const express = require('express'); 
const cors = require('cors');
const { dbConnection } = require('../db/connection');
// const rutaUsuario = require('../router/usuarios.routes')

const rutaProducto = require('../router/rutaProductos')

class Server{
    constructor(){
        this.app = express(); 
        this.app.PORT = process.env.PORT;
        this.middlewares();
        this.DBconexion(); 
        this.router(); 
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    async DBconexion(){
        await dbConnection();

    }
    router() {
        // this.app.use(rutaUsuario);
        this.app.use('/api/v1/productos', rutaProducto)
    }
    
    listen(){
        this.app.listen(this.app.PORT, ()=> {
            console.log(`se esta escuchando en el puerto ${this.app.PORT}`);
        })
    }
}

module.exports = Server; 