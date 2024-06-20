const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('DB Connection Successful')
    })
    .catch(err => {
        console.log('Error'+ err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.authors=require('./authorModel.js')(sequelize, DataTypes)
db.books = require('./bookModel.js')(sequelize, DataTypes);


// db.products = require('./productModel.js')(sequelize, DataTypes)
// db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
//
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })



db.authors.hasMany(db.books, {
    foreignKey: 'authorId',
    as: 'books'
});

db.books.belongsTo(db.authors, {
    foreignKey: 'authorId',
    as: 'author'
});



module.exports = db