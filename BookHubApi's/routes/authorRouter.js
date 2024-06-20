const express = require('express');
const authorController = require('./../controllers/authorController');
const authController=require('./../controllers/authController')
const router = express.Router();

// router.param('id', tourController.checkID);
router.route('/')
    .get(authController.protect,authorController.getAllAuthors)
    .post(authorController.addAuthor)
router.route('/:id')
    .get(authController.protect,authorController.getAuthor)
    .patch(authController.protect,authorController.updateAuthor)
    .delete(authController.protect,authorController.deleteAuthor)

module.exports = router;