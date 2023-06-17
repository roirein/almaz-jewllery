const mailer = require('./mailClient');

const sendTemporaryPasswordMail = (password, recipent) => {
    mailer.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: recipent,
            subject: 'Temporary Passsword',
            text: `Your temporary password is ${password}\n, You must change it on your first login`
        }
    )
}


const sendYourUserApprovedMail = (firstName, recipient) => {
    mailer.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: 'Your User Approved',
            text: `Dear ${firstName}, we're glad to tell you that your request to join our system approved by the admin`
        }
    )
}

const sendResetPasswordCode = (firstName, lastName, recipient, code) => {
    mailer.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: 'Password Reset Code',
            text: `Dear ${firstName} ${lastName}, your verification code is ${code}`
        }
    )
}


module.exports = {
    sendTemporaryPasswordMail,
    sendYourUserApprovedMail,
    sendResetPasswordCode
}