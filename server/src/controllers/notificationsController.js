const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const Notification = require('../models/messages/notificationModel');

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            where: {
                recipient: req.params.userId
            },
            order: [['created', 'DESC']],
            limit: 100
        })
        res.status(HTTP_STATUS_CODE.SUCCESS).send({notifications})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

module.exports = {getNotifications}