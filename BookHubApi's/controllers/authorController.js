const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const { getPagination, getPagingData } = require('../utils/pagination');
const db=require('../models')
Author=db.authors
Book=db.books
sequelize=db.sequelize

exports.addAuthor = catchAsync(async (req, res) => {

    let info = {
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio ? req.body.bio: ''
    }

    const author = await Author.create(info)
    res.status(200).send(author)
    console.log(author)

})

exports.getAllAuthors = catchAsync(async (req, res,next) => {

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const data = await Author.findAndCountAll({
        limit,
        offset
    });

    const response = getPagingData(data, page, limit);

    res.status(200).json(response);
})
exports.getAuthor =catchAsync( async (req,res,next) => {

    let id = req.params.id
    // let author = await Author.findOne({ where: { id: id }})
    const author = await Author.findOne({
        include: [{
            model: Book,
            as: 'books'
        }],
        where: { id: id }
    })
    if (!author) return next(new AppError("no author found", 404));
    res.status(200).send(author)

})

exports.updateAuthor = async (req, res, next) => {
    let id = req.params.id
    const author = await Author.update(req.body, { where: { id: id }})
    if (author[0]===0)  return next(new AppError('no author found with that id', 404));
    res.status(200).send(author)
}

exports.deleteAuthor = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return next(new AppError('No author found', 404));
        }
        await Book.destroy({ where: { authorId: id } }, { transaction });
        await Author.destroy({ where: { id: id } }, { transaction });
        await transaction.commit();
        res.status(200).send('Author and associated books are deleted!');
    } catch (error) {
        await transaction.rollback();
        return next(new AppError('Failed to delete author and associated books', 500));
    }
});