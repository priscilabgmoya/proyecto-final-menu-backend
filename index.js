const Server = require('./src/model/Server'); 

require('dotenv').config(); 
const server = new Server();
server.listen(); 
