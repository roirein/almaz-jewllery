const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const DBClient = require('./database/connection');
const createDB = require('./database/db');
const {HTTP_STATUS_CODES} = require('./consts/db-consts')

const authRoute = require('./routes/authentication');

const app = express();
const port = 3000

createDB(DBClient).then((res) => {
    if (res) {
        console.log('Database created');
    }
})

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use('/auth', authRoute);

app.use((err, req, res, next) => {
    console.log(err.status)
    res.status(err.status || HTTP_STATUS_CODES.SERVER_ERROR).send(err.message)
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})

