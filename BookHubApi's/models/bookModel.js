
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3],
                    msg: 'Title must be at least 3 characters long'
                }
            }
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
            as: 'author'
        });
    };


    return Book;
};
