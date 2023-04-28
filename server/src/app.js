const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const DBClient = require('./database/connection');
const createDB = require('./database/db');
const authRoute = require('./routes/authentication');

const app = express();
const port = 3000

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use('/auth', authRoute);

createDB(DBClient).then((res) => {
    if (res) {
        console.log('Database created');
    }
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})

