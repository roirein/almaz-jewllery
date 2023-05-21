// require express related packages
const express = require('express');
const {createServer} = require('http');
// require supported packges
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const {parse} = require('csv-parse');
const {HTTP_STATUS_CODE} = require('./consts/http-consts')
require('dotenv').config();
// require db related files 
const seqelize = require('./database/connection');
require('./models/users/userModel');
require('./models/users/customerModel');
require('./models/users/employeeModel');

const {createAndInsertNewEmployee} = require('./utils/utils')

// require consts and socket io 

const socket = require('./services/socket/socket');

const app = express();
const server = createServer(app)
socket.init(server);

require('./services/socket/listener'); // activate socket connection


const authRoute = require('./routes/user');
const employeeRoute = require('./routes/employee');
// const customerRoute = require('./routes/customer');

const port = process.env.SERVER_PORT || 3000;

const parser = parse({
    delimiter: ','
})

parser.on('readable', async () => {
    let record;
    while ((record = parser.read()) !== null) {
        await createAndInsertNewEmployee(record);
    }
})

parser.on('error', async (err) => {
    console.error(err.message)
})

parser.on('end', async () => {
    console.log('end')
})

seqelize.sync({force: true}).then(() => {
    fs.createReadStream(process.env.INITIAL_USERS_DATA_FILE).pipe(parser);
});

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use('/auth', authRoute);
// app.use('/employee', employeeRoute);
// app.use('/customer', customerRoute);

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.code || HTTP_STATUS_CODE.SERVER_ERROR).send(err.message)
})

server.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})