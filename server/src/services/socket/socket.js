let ioInstance = null;

const users = {}

const initSocket = (io) => {
    ioInstance = io;

    ioInstance.on('connection', (socket) => {
        socket.on('login', async (data) => {
            console.log('user logged in ', data.userId)
            users[data.userId] = socket.id
        })
    })
}

const sendNotification = (notification) => {
    const socketId = users[notification.recipient];
    console.log(notification)
    if (socketId) {
        console.log(1)
        ioInstance.to(socketId).emit('newOrder', notification);
    }
}

module.exports = {initSocket, sendNotification}