const jwt = require('jsonwebtoken');
// const { User } = require('../models');

const { postUser } = require('../services/userServices');

const SECRET = '123456';
const jwtConfig = { expiresIn: '1d' };

const postUserController = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await postUser(displayName, email, password, image);
    const { id } = user.dataValues;
    const token = jwt.sign({ id, displayName, email }, SECRET, jwtConfig);
    console.log(token);
    return res.status(201).json({ token });
};

module.exports = {
    postUserController,
};