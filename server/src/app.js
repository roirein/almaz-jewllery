const express = require('express');
const cors = require('cors');
const passport = require('passport')
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const DBClient = require('./database/connection');
const createDB = require('./database/db');
const authRoute = require('./routes/authentication');
require('./middlewares/passport-config');

const app = express();
const port = 3000

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use(session({ 
    secret: 'secret',
    resave: 'false',
    saveUninitialized: 'false ' 
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/auth', authRoute);

createDB(DBClient).then((res) => {
    if (res) {
        console.log('Database created');
    }
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})

