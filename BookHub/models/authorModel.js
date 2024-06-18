// authorModel.js

module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('author', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Author;
};
