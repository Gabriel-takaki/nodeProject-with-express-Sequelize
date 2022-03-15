const express = require('express');

const userRouter = express.Router();

const userControllers = require('../controllers/userControllers');
const validationUser = require('../middlewares/validation');

userRouter.post('/', validationUser.validationDisplayName, 
validationUser.validationEmail, 
validationUser.validationPassword, 
userControllers.postUserController);

userRouter.get('/', validationUser.validationToken,
userControllers.getAllUsersController);

module.exports = userRouter;