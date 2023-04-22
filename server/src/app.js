const express = require('express');
const cors = require('cors');
const DBClient = require('./database/connection');
const createDB = require('./database/db');

const app = express();
const port = 3000

app.use(express.json());
app.use(cors());

createDB(DBClient).then((res) => {
    if (res) {
        console.log('Database created')
    }
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})

