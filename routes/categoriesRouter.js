const express = require('express');

const categoriesRouter = express.Router();

const categoriesControllers = require('../controllers/categoriesController');
const validationUser = require('../middlewares/validation');

categoriesRouter.post('/',
validationUser.validationToken,
categoriesControllers.postCategorieController);

categoriesRouter.get('/', validationUser.validationToken,
categoriesControllers.getAllCategoriesController);

// userRouter.get('/:id', validationUser.validationToken, userControllers.getUserByIdController);

module.exports = categoriesRouter;