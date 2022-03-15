require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const { postUser } = require('../services/userServices');

const { JWT_SECRET } = process.env;

const jwtConfig = { expiresIn: '1d' };

const postUserController = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const userExist = await Users.findOne({ where: { email } });
    console.log(userExist);
    if (userExist) return res.status(409).json({ message: 'User already registered' });

    const user = await postUser(displayName, email, password, image);
    const { id } = user.dataValues;
    const token = jwt.sign({ id, displayName, email }, JWT_SECRET, jwtConfig);
    console.log(token);
    return res.status(201).json({ token });
};

const getAllUsersController = async (_req, res, _next) => {
    const allUsers = await Users.findAll({
        attributes: { exclude: ['password'] },
    });
    console.log(allUsers);
    return res.status(200).json(allUsers);
};

const getUserByIdController = async (req, res, _next) => {
    const { id } = req.params;

    const allUsersById = await Users.findOne({ where: { id } });
    if (!allUsersById) return res.status(404).json({ message: 'User does not exist' });
    const userFiltredById = allUsersById.dataValues;
    console.log(userFiltredById);
    return res.status(200).json(allUsersById);
};

module.exports = {
    postUserController,
    getAllUsersController,
    getUserByIdController,
};