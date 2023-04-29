const {Client} = require('pg');

const client1 = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

const createDatatbase = async () => {
    try {
        await client1.connect()
        await client1.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    } catch (error) {
        return
    } finally {
        client1.end()
    }
}

const client2 = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


createDatatbase().then(() => {
    client2.connect()
});


module.exports = client2