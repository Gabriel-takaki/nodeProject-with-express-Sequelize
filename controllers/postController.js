require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Users } = require('../models');
// const Users = require('../models/Users');

const { JWT_SECRET } = process.env;

const createPost = async (req, res, _next) => {
    try {
 const { title, content, categoryIds } = req.body;
      const token = req.headers.authorization;
      const jwtVerification = jwt.verify(token, JWT_SECRET);
      const email = jwtVerification.data;
      console.log(email);
      const findId = await Users.findOne({ where: { email } });
      console.log('testando findddddddddd', findId);
      const userId = findId.dataValues.id;
      console.log(userId);
  
      const newPost = await BlogPost.create({ title, content, userId });
      
      const createPostCategory = categoryIds
      .map((id) => PostCategory.create({ postId: newPost.id, categoryId: id }));
      await Promise.all(createPostCategory);
      return res.status(201).json(newPost);
    } catch (e) {
      return res.status(404).json(e);
    }
  };

  module.exports = {
      createPost,
  };