const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('connection has established succesfully');
    } catch (e) {
        console.error('unable to connect database:', e)
    }
})();

module.exports = sequelize;