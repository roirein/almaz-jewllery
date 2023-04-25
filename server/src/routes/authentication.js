const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register', passport.authenticate('signup', {session: false}), async(req, res) => {
    res.sendStatus(201);
})

module.exports = router;