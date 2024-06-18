const { Op } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const db=require('../models')
Book=db.books
Author=db.authors
//const sequelize = db.sequelize;

exports.addBook =catchAsync( async (req, res) => {
    let info = {
        title: req.body.title,
        description: req.body.description,
        authorId: req.body.authorId
    }

    const book = await Book.create(info)
    res.status(200).send(book)
    console.log(book)
})

// exports.getAllBooks = async (req, res) => {
//     try {
//         const { title, author } = req.query;
//
//         let condition = {};
//         if (title) {
//             condition.title = sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), {
//                 [Op.like]: `%${title.toLowerCase()}%`
//             });
//         }
//         if (author) {
//             condition['$author.name$'] = sequelize.where(sequelize.fn('LOWER', sequelize.col('author.name')), {
//                 [Op.like]: `%${author.toLowerCase()}%`
//             });
//         }
//         console.log(condition)
//
//         const books = await Book.findAll({
//             where: condition,
//             include: [{
//                 model: Author,
//                 as: 'author',
//                 attributes: ['name'] // Include author's name
//             }]
//         });
//
//         res.status(200).send(books);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };
exports.getAllBooks = catchAsync(async (req, res) => {
        const { title, author } = req.query;

        let condition = {};
        if (title) {
            condition.title = {
                [Op.like]: `%${title}%`
            };
        }
        if (author) {
            condition['$author.name$'] = {
                [Op.like]: `%${author}%`
            };
        }

        const books = await Book.findAll({
            where: condition,
            include: [{
                model: Author,
                as: 'author',
                attributes: ['name'] // Include author's name
            }]
        });

        //res.status(200).send(books);
    res.status(200).json({
        length:books.length,
        books
    })
});

exports.getBook = catchAsync(async (req, res,next) => {
        let id = req.params.id;
        const book = await Book.findOne({
            include: [{
                model: Author,
                as: 'author',
                attributes: ['name']
            }],
            where: { id: id }
        });
    if (!book) return next(new AppError("no book found", 404));
        res.status(200).send(book);
});

exports.updateBook = catchAsync(async (req, res,next) => {

    let id = req.params.id
    const book = await Book.update(req.body, { where: { id: id }})
    if (book[0]===0)  return next(new AppError('no book found', 404));
    res.status(200).send(book)

})

exports.deleteBook = catchAsync(async (req, res, next) => {

    let id = req.params.id
    if (!await Book.destroy({ where: { id: id }} )) return next(new AppError('no book found',404))
    //if (!await Author.destroy({ where: { id: id }} )) return next(new AppError('no author found with that id'))
    res.status(200).send('Book is deleted !')

})
