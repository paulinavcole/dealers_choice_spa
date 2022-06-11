const Sequelize = require('sequelize');
const {STRING} = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Task = conn.define('task', {
    name: {
        type: STRING, 
        unique: true, 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const syncAndSeed = async() => {
    await conn.sync({force: true});
    await Promise.all([
        Task.create({name: 'pick up groceries'}),
        Task.create({name: 'clean the house'}),
        Task.create({name: 'feed pets'})
    ]);
};

module.exports = {
    syncAndSeed,
    Task
}