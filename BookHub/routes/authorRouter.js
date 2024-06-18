const express = require('express');
const authorController = require('./../controllers/authorController');

const router = express.Router();

// router.param('id', tourController.checkID);
router.route('/')
    .get(authorController.getAllAuthors)
    .post(authorController.addAuthor)
router.route('/:id')
    .get(authorController.getAuthor)
    .patch(authorController.updateAuthor)
    .delete(authorController.deleteAuthor)

module.exports = router;