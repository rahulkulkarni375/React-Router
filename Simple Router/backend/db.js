const { Client } = require('pg');

//Add your details
const client = new Client({
  user: '',					
	password: '',
	host: '',
	port: '',
	database: '',
});

module.exports = client;

