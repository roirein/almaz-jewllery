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
    if (socketId) {
        ioInstance.to(socketId).emit('notification', notification);
    }
}

module.exports = {initSocket, sendNotification}