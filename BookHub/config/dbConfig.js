module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'pass1234',
    DB: 'bookhub',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}