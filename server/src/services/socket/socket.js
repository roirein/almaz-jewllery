let ioInstance = null;

const initSocket = (io) => {
    ioInstance = io;

    ioInstance.on('connection', (socket) => {
        console.log(socket.id, 'connected')
    })
}

module.exports = {initSocket}