const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Category } = require('../models');

const { JWT_SECRET } = process.env;

const validationDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validationEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ 
      message: '"email" is required',
    });
  } 
  if (!email.length) {
    return res.status(400).json({ 
      message: '"email" is not allowed to be empty',
    });
  }
  const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegExp.test(email)) {
    return res.status(400).json({ 
      message: '"email" must be a valid email',
    });
  }
  next();
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ 
      message: '"password" is required',
    });
  } 
  if (!password.length) {
    return res.status(400).json({ 
      message: '"password" is not allowed to be empty',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

const validationToken = async (req, res, next) => {
  const checkToken = req.headers.authorization;
  if (!checkToken) return res.status(401).json({ message: 'Token not found' });
  try {
    jwt.verify(checkToken, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
    // refatorando codigo de verificação para ficar mais clean com ajuda da pr do caio lima turma 15 pr: 'https://github.com/tryber/sd-015-a-project-blogs-api/tree/caio-lima-blogs-api'
  }
};

const validationPostBody = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

async function validateCategories(req, res, next) {
  const { categoryIds } = req.body;
  const found = (await Category.findAll({ attributes: ['id'] })).map((a) => a.id);
  const testIds = categoryIds.every((id) => found.includes(id));
  if (!testIds) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
}

module.exports = {
  validationDisplayName,
  validationEmail,
  validationPassword,
  validationToken,
  validationPostBody,
  validateCategories,
};