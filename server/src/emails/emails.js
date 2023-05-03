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
    console.log(process.env.EMAIL_USER, recipient)
    mailer.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: 'Your User Approved',
            text: `Dear ${firstName}, we're glad to tell you that your request to join our system approved by the admin`
        }
    )
}


module.exports = {
    sendTemporaryPasswordMail,
    sendYourUserApprovedMail
}