const io = require('./socket').getIo();
const {ROLES, USER_TYPES} = require('../../consts/system-consts');
const User = require('../../models/users/userModel');
const Customer = require('../../models/users/customerModel');
const Employee = require('../../models/users/employeeModel');

const users = {}

try {
    io.on('connection', (socket) => {
        
        socket.on('login', async (data) => {
            const userId = data.userId;
            const userData = await User.findByPk(userId, {
                attributes: ['type']
            });
            if (userData.dataValues.type === USER_TYPES.EMPLOYEE) {
                const employeeData = await Employee.findByPk(userId, {
                    attributes: ['role']
                });
                if (employeeData.dataValues.role === ROLES.MANAGER) {
                    socket.join('admins');
                }
                users[userId] = {
                    id: socket.id,
                    role: employeeData.dataValues.role
                }
            } else {
                users[userId] = {
                    id: socket.id,
                    role: USER_TYPES.CUSTOMER
                } 
            }
        });

        socket.on('disconnect', () => {
            const user = Object.entries(users).find(user => user[1].id === socket.id);
            if (user) {
                delete user[user[0]];
            }
        })
    })
} catch (error) {
    console.log('socket not connected')
}

module.exports = users
