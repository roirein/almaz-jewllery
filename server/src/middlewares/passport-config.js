const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const {getInsertUserQuery} = require('../database/queries');
const dbClient = require('../database/connection')

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req ,email, password, done) => {
            try {
                req.body.password = await bcrypt.hash(password, 8)
                console.log(getInsertUserQuery(req.body))
                await dbClient.query(getInsertUserQuery(req.body));
                done(null, req.body)
            } catch (e) {
                console.log(e)
            }
        }
    )
)