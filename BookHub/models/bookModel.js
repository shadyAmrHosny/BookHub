// bookModel.js

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Book.associate = (models) => {
        Book.belongsTo(models.authors, {
            foreignKey: 'authorId',
            as: 'author' // Alias
        });
    };


    return Book;
};
