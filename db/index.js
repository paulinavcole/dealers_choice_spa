const Sequelize = require('sequelize');
const {STRING} = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const toDo = conn.define('todo', {
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
        toDo.create({name: 'pick up groceries'}),
        toDo.create({name: 'clean the house'}),
        toDo.create({name: 'feed pets'})
    ]);
};

module.exports = {
    syncAndSeed,
    toDo
}