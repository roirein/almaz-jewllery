const socketio = require('socket.io');

let io = null;

module.exports = {
    init: (app) => {
        io = socketio(app);
    },
    getIo: () => {
        return io;
    }
};