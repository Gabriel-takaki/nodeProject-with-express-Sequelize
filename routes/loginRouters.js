const express = require('express');

const loginRouter = express.Router();

const loginController = require('../controllers/loginController');
const validationUser = require('../middlewares/validation');

loginRouter.post('/', 
validationUser.validationEmail, 
validationUser.validationPassword, 
loginController.loginController);

module.exports = loginRouter;