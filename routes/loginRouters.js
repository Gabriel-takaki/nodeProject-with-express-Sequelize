const express = require('express');

const loginRouter = express.Router();

const loginController = require('../controllers/loginController');
const validationUser = require('../middlewares/validation');

loginRouter.post('/', 
validationUser.validationEmail, 
validationUser.validationPassword, 
loginController.login);

module.exports = loginRouter;