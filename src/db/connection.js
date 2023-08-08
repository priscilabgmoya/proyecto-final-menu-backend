const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.CONECTION_MDB); 
       console.log('Base de datos Conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {dbConnection};