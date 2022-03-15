const jwt = require('jsonwebtoken');
require('dotenv').config();

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
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decoded = jwt.verify(token, JWT_SECRET);

    req.tokenData = decoded.id;

    next();
  } catch (error) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  }
};
module.exports = {
  validationDisplayName,
  validationEmail,
  validationPassword,
  validationToken,
};