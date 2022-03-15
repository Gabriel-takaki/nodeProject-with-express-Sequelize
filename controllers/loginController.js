const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const { JWT_SECRET } = process.env;
const jwtConfig = { expiresIn: '1d' };

const loginController = async (req, res) => {
  try {
    const { email } = req.body;
    const userLoged = await Users.findAll({ where: { email } });
    console.log('testDoConsole', userLoged);
    if (!userLoged.length) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  loginController,
};