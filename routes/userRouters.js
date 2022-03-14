const express = require('express');

const userRouter = express.Router();

const userControllers = require('../controllers/userControllers');
const validationUser = require('../middlewares/emailValidation');

userRouter.post('/', validationUser.validationDisplayName, 
validationUser.validationEmail, 
validationUser.validationPassword, 
userControllers.postUserController);

module.exports = userRouter;