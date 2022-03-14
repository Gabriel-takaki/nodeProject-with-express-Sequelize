const { Users } = require('../models');
require('dotenv').config();

const postUser = async (displayName, email, password, image) => {
    const userCreated = await Users.create({ displayName, email, password, image });
    console.log(userCreated);
    return userCreated;
};

module.exports = {
    postUser,
};