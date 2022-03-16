const express = require('express');

const postRouter = express.Router();

const postController = require('../controllers/postController');
const validationUser = require('../middlewares/validation');

postRouter.post('/', 
validationUser.validationPostBody,
validationUser.validateCategories,
validationUser.validationToken, 
postController.createPost);

module.exports = postRouter;