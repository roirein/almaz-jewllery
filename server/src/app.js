const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const {parse} = require('csv-parse');
const {v4: uuidv4} = require('uuid')
require('dotenv').config();

const DBClient = require('./database/connection');
const createDB = require('./database/db');
const {HTTP_STATUS_CODES} = require('./consts/db-consts')
const {insertUser, insertEmployee} = require('./database/queries')

const authRoute = require('./routes/authentication');

const app = express();
const port = process.env.SERVER_PORT || 3000;

const parser = parse({
    delimiter: ','
})

parser.on('readable', async () => {
    let record;
    while ((record = parser.read()) !== null) {
        const userId = uuidv4();
        const employeeId = uuidv4();
        const temporaryPassword = Math.random().toString(36).slice(-8)

        const user = {
            id: userId,
            firstName: record[0],
            lastName: record[1],
            email: record[2],
            password: temporaryPassword,
            shouldReplace: true
        }

        const employee = {
            userId: userId,
            employeeId: employeeId,
            permissionLevel: record[3]
        }

        await insertUser(user);
        await insertEmployee(employee);
    }
})

parser.on('error', async (err) => {
    console.error(err.message)
})

parser.on('end', async () => {
    console.log('end')
})

createDB(DBClient).then((res) => {
    if (res) {
        try {
            fs.createReadStream(process.env.INITIAL_USERS_DATA_FILE).pipe(parser)
        } catch (e) {
            return 
        }
    }
});

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

