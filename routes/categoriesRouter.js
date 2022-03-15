const express = require('express');

const categoriesRouter = express.Router();

const categoriesControllers = require('../controllers/categoriesController');
const validationUser = require('../middlewares/validation');

categoriesRouter.post('/',
validationUser.validationToken,
categoriesControllers.postCategorieController);

// userRouter.get('/', validationUser.validationToken,
// userControllers.getAllUsersController);

// userRouter.get('/:id', validationUser.validationToken, userControllers.getUserByIdController);

module.exports = categoriesRouter;