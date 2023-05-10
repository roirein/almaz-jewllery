// require express related packages
const express = require('express');
const {createServer} = require('http');
// require supported packges
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const {parse} = require('csv-parse');
require('dotenv').config();
// require db related files 
const seqelize = require('./database/connection');
require('./models/users/userModel');
require('./models/users/customerModel');
seqelize.sync({force: true})
//const {createAndInsertNewEmployee} = require('./utils/utils')

// require consts and socket io 
const {HTTP_STATUS_CODES} = require('./consts/db-consts')
const socket = require('./socket/socket');

const app = express();
const server = createServer(app)
socket.init(server);

require('./socket/listener'); // activate socket connection


const authRoute = require('./routes/authentication');
// const employeeRoute = require('./routes/employee');
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

// createDB(DBClient).then((res) => {
//     if (res) {
//         try {
//             fs.createReadStream(process.env.INITIAL_USERS_DATA_FILE).pipe(parser)
//         } catch (e) {
//             return 
//         }
//     }
// });

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use('/auth', authRoute);
// app.use('/employee', employeeRoute);
// app.use('/customer', customerRoute);

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || HTTP_STATUS_CODES.SERVER_ERROR).send(err.message)
})

server.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})