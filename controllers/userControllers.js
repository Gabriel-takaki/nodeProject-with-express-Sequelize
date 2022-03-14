require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const { postUser } = require('../services/userServices');

const { SECRET } = process.env;

const jwtConfig = { expiresIn: '1h' };

const postUserController = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const userExist = await Users.findOne({ where: { email } });
    console.log('aaaaaaaaa', userExist);
    if (userExist) return res.status(409).json({ message: 'User already registered' });

    const user = await postUser(displayName, email, password, image);
    const { id } = user.dataValues;
    const token = jwt.sign({ id, displayName, email }, SECRET, jwtConfig);
    console.log(token);
    return res.status(201).json({ token });
};

module.exports = {
    postUserController,
};