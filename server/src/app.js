// require express related packages
const express = require('express');
const next = require('next');
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
// Order.sync({force: true}).then(() => {
//     OrderInDesign.sync({force: true})
//     NewModelOrder.sync({force: true})
//     ExistingModelOrder.sync({force: true})
// });
// JewelModel.sync({force: true});

//Order.sync({force: true})

const {createAndInsertNewEmployee} = require('./utils/utils')

// require consts and socket io 

const socket = require('./services/socket/socket');

const app = express();
const server = createServer(app)
socket.init(server);

require('./services/socket/listener'); // activate socket connection


const authRoute = require('./routes/user');
const employeeRoute = require('./routes/employee');
const imageRoute = require('./routes/images');
// const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/orders');
const modelRoute = require('./routes/models');
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

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    const server = createServer(app);
    socket.init(server);

    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors());

    app.use('/auth', authRoute);
    app.use('/employee', employeeRoute);
    app.use('/image', imageRoute);
    app.use('/order', orderRoute);
    app.use('/model', modelRoute);

    app.use((err, req, res, next) => {
        res.status(err.code || HTTP_STATUS_CODE.SERVER_ERROR).send(err.message)
    })

    app.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, () => {
        console.log(`server is up and running on port ${port}`)
    })

});