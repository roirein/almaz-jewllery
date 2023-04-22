const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    password: '1234',
    database: 'almaz_databse'
});

client.connect()
module.exports = client