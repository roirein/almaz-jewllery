const mailer = require('./mailClient');

const sendTemporaryPasswordMail = (password, recipent) => {
    mailer.sendMail(
        {
            from: "roirein@gmail.com",
            to: recipent,
            subject: 'Temporary Passsword',
            text: `Your temporary password is ${password}\n, You must change it on your first login`
        }
    )
}


module.exports = {
    sendTemporaryPasswordMail
}