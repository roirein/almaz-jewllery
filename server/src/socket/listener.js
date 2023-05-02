const io = require('./socket').getIo();

const users = {}

try {
    io.on('connection', (socket) => {

        socket.on('admin-login', (data) => {
            const userId = data.userId;
            users[userId] = {
                socketId: socket.id,
                permissionLevel: 0
            }
        })
    })
} catch (error) {
    console.log(error)
    console.log('socket not connected')
}

module.exports = users
