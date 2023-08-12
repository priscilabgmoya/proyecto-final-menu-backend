require('dotenv').config(); 
const Server = require('./src/model/Server'); 

const server = new Server();
server.listen(); 

