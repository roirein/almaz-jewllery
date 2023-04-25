const {Client} = require('pg');

const client1 = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    password: '1234',
});

const createDatatbase = async () => {
    client1.connect()
    try {
        await client1.query('CREATE DATABASE almaz_databse');
    } catch (error) {
        return
    } finally {
        client1.end()
    }
}

const client2 = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    password: '1234',
    database: 'almaz_databse'
});

createDatatbase().then(() => {
    client2.connect()
});


module.exports = client2