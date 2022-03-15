require('dotenv').config();
// const jwt = require('jsonwebtoken');

const { Category } = require('../models');

// const { JWT_SECRET } = process.env;

// const jwtConfig = { expiresIn: '1d' };

const postCategorieController = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    const categorieCreated = await Category.create({ name });
    return res.status(201).json(categorieCreated);
};

module.exports = {
    postCategorieController,
};